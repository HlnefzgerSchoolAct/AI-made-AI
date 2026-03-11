// ============================================================
// Conversation Manager — routes user input through Hack Club
// AI API. Local quiz & SRS systems remain.
// ============================================================
var Conversation = (function () {
  'use strict';

  var STORAGE_KEY = 'profesor_conversation';

  var state = {
    difficulty: 'intermediate',    // beginner | intermediate | advanced
    currentTopic: null,           // e.g. 'food', 'ser_estar'
    currentLesson: null,          // lesson type in progress
    lastIntent: null,
    lastEntities: {},
    quizActive: false,
    srsSessionActive: false,
    conversationCount: 0
  };

  function loadState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        for (var key in parsed) {
          if (state.hasOwnProperty(key)) state[key] = parsed[key];
        }
      }
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function init() {
    loadState();
  }

  // ── Simple keyword-based mode detection (for prompt construction) ──
  var MODE_KEYWORDS = {
    quizzing:  /\b(quiz|test|exam)\b/i,
    correcting: /\b(correct|fix|check)\b.*\b(spanish|my|this|texto)\b/i,
    conversing: /\b(practice|let'?s talk|convers|chat in spanish|habla)\b/i,
    reading:   /\b(reading|compreh|passage|read)\b/i,
    writing:   /\b(writing|write|essay|compose)\b/i,
    dialogue:  /\b(role.?play|dialogue|scenario|pretend|waiter|shop)\b/i,
    cultural:  /\b(cultur|tradition|custom|holiday|festival|countr)\b/i
  };

  function detectMode(text) {
    for (var mode in MODE_KEYWORDS) {
      if (MODE_KEYWORDS.hasOwnProperty(mode) && MODE_KEYWORDS[mode].test(text)) {
        return mode;
      }
    }
    return 'teaching'; // default mode
  }

  // ── Detect difficulty change requests locally ──
  function detectDifficultyChange(text) {
    var lower = text.toLowerCase();
    if (/\b(set|change|switch)\b.*\b(level|difficulty)\b/i.test(text) ||
        /\b(beginner|intermediate|advanced)\b.*\blevel\b/i.test(text)) {
      if (/\bbeginner\b/.test(lower)) return 'beginner';
      if (/\bintermediate\b/.test(lower)) return 'intermediate';
      if (/\badvanced\b/.test(lower)) return 'advanced';
    }
    return null;
  }

  /**
   * Process user input. Always returns a Promise<string>.
   */
  function processInput(text) {
    if (!text || !text.trim()) return Promise.resolve('');

    text = text.trim();
    state.conversationCount++;

    // ── Context: resolve anaphora ("it", "that verb", etc.) ──
    if (typeof Context !== 'undefined') {
      var resolved = Context.resolveAnaphora(text);
      if (resolved.resolved) {
        text = resolved.text;
      }
    }

    // ── SRS session routing (stays local) ──
    if (state.srsSessionActive && typeof SRS !== 'undefined') {
      var srsResponse = _handleSRSInput(text);
      if (srsResponse) {
        _trackTurn(text, 'review_srs', {}, srsResponse);
        saveState();
        return Promise.resolve(srsResponse);
      }
    }

    // ── Quiz answer routing (stays local) ──
    if (state.quizActive && typeof Quiz !== 'undefined') {
      var quizResult = Quiz.handleAnswer(text);
      if (quizResult) {
        if (quizResult.quizEnded) state.quizActive = false;
        _trackTurn(text, 'quiz_answer', {}, quizResult.response);
        saveState();
        return Promise.resolve(quizResult.response);
      }
    }

    // ── Quiz start (keep local interactive quiz engine) ──
    if (/\bquiz\b/i.test(text) && typeof Quiz !== 'undefined') {
      var entities = typeof Entities !== 'undefined' ? Entities.extract(text) : {};
      var category = entities.category || state.currentTopic || 'unidad2a1';
      var quizResp = Quiz.start(category);
      state.quizActive = true;
      _trackTurn(text, 'quiz_start', entities, quizResp);
      saveState();
      return Promise.resolve(quizResp);
    }

    // ── SRS / flashcard review start (keep local) ──
    if (/\b(flashcard|review card|srs)\b/i.test(text) && typeof SRS !== 'undefined') {
      var srsReviewResp = typeof Responses !== 'undefined' ? Responses.generateSRSReview() : '';
      if (srsReviewResp && SRS.isSessionActive()) {
        state.srsSessionActive = true;
      }
      _trackTurn(text, 'review_srs', {}, srsReviewResp);
      saveState();
      return Promise.resolve(srsReviewResp);
    }

    // ── Difficulty change (local state toggle) ──
    var newDifficulty = detectDifficultyChange(text);
    if (newDifficulty) {
      state.difficulty = newDifficulty;
      var diffResp = '¡Entendido! I\'ve set your level to <strong>' + state.difficulty + '</strong>. I\'ll adjust my teaching accordingly! 🎯';
      _trackTurn(text, 'change_difficulty', {}, diffResp);
      saveState();
      return Promise.resolve(diffResp);
    }

    // ── Extract entities for prompt context (not for routing) ──
    var entities = typeof Entities !== 'undefined' ? Entities.extract(text) : {};
    state.lastEntities = entities;

    // Update topic tracking from entities
    if (entities.category) state.currentTopic = entities.category;
    if (entities.grammarTopic) state.currentTopic = entities.grammarTopic;

    // Track progress for word lookups
    if (typeof Progress !== 'undefined' && entities.wordToTranslate) {
      Progress.addWord(entities.wordToTranslate);
    }

    // Auto-add SRS card for translation requests
    if (entities.wordToTranslate) {
      _autoAddSRSCard(entities);
    }

    // ── Detect mode for prompt construction ──
    var mode = detectMode(text);

    // ── Build messages for AI ──
    var history = typeof Context !== 'undefined' ? Context.getFormattedHistory(10) : [];
    var messages = Prompts.buildMessages(text, history, state, mode, entities);

    saveState();

    // ── Send to Hack Club AI API ──
    return APIClient.sendMessage(messages).then(function (response) {
      if (response) {
        _trackTurn(text, mode, entities, response);
        if (typeof Progress !== 'undefined') Progress.recordLesson();
        return response;
      }
      return 'Sorry, I didn\'t get a response. Please try again! 😊';
    }).catch(function () {
      return 'Sorry, I\'m having trouble connecting right now. Please try again in a moment! 😊';
    });
  }

  // ── SRS session input handler (unchanged) ──
  function _handleSRSInput(text) {
    if (typeof SRS === 'undefined' || !SRS.isSessionActive()) {
      state.srsSessionActive = false;
      return null;
    }

    var lower = text.toLowerCase().trim();

    if (/\b(show|flip|reveal|answer)\b/.test(lower)) {
      var dueCards = SRS.getDueCards(1);
      if (dueCards.length > 0) {
        return SRS.formatReviewCard(dueCards[0], true) +
          '\n\n💡 Rate your recall: <strong>1</strong> (forgot) · <strong>3</strong> (hard) · <strong>4</strong> (good) · <strong>5</strong> (easy)';
      }
    }

    var rating = parseInt(lower, 10);
    if (rating >= 1 && rating <= 5) {
      var dueCards = SRS.getDueCards(1);
      if (dueCards.length > 0) {
        SRS.reviewCard(dueCards[0].id, rating);
        SRS.save();
        var nextDue = SRS.getDueCards(1);
        if (nextDue.length > 0) {
          return (rating >= 4 ? '✅ Great recall!' : '📝 Keep practicing that one!') +
            '\n\n' + SRS.formatReviewCard(nextDue[0], false) +
            '\n\n💡 Type <strong>"show answer"</strong> to flip, or type your answer.';
        } else {
          state.srsSessionActive = false;
          return '🎉 <strong>Review session complete!</strong> You\'ve reviewed all due cards. ¡Buen trabajo! 🌟\n\n' +
            SRS.formatDeckOverview();
        }
      }
    }

    if (/\b(quit|stop|done|exit|cancel|end)\b/.test(lower)) {
      SRS.cancelSession();
      state.srsSessionActive = false;
      return '📚 Review session ended. ' + SRS.formatDeckOverview();
    }

    return null;
  }

  // ── Auto-add SRS card from translation ──
  function _autoAddSRSCard(entities) {
    if (typeof SRS === 'undefined' || !entities.wordToTranslate) return;
    var entry = typeof Dictionary !== 'undefined' ? Dictionary.lookup(entities.wordToTranslate) : null;
    if (entry) {
      SRS.addVocabularyCard(entry);
      SRS.save();
    }
  }

  // ── Track conversation turn in Context ──
  function _trackTurn(text, tag, entities, response) {
    if (typeof Context !== 'undefined') {
      Context.pushTurn(text, tag, entities, response);
    }
  }

  function getState() {
    return state;
  }

  function reset() {
    state.currentTopic = null;
    state.currentLesson = null;
    state.lastIntent = null;
    state.lastEntities = {};
    state.quizActive = false;
    state.srsSessionActive = false;
    if (typeof Context !== 'undefined') Context.reset();
    saveState();
  }

  return {
    init: init,
    processInput: processInput,
    getState: getState,
    reset: reset
  };
})();
