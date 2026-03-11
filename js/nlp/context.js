// ============================================================
// Conversation Context Manager — multi-turn memory & anaphora
// ============================================================
var Context = (function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────
  var MAX_HISTORY = 20;
  var history = [];           // [{input, intent, entities, response, timestamp}]
  var currentTopic = null;    // e.g. 'vocabulary', 'grammar', 'conjugation'
  var currentEntity = null;   // last specific word/verb/topic the user asked about
  var conversationState = 'idle'; // idle | topic_active | quiz_active | reading_active | dialogue_active | writing_active | review_active
  var topicStack = [];        // stack of recent topics for "go back" functionality
  var sessionStart = Date.now();
  var turnCount = 0;

  // ── Anaphoric References ───────────────────────────────────
  // Words that refer back to something previously mentioned
  var anaphoricPatterns = [
    /\b(it|that|this|those|these|the same)\b/i,
    /\b(that one|this one|the other one|another one)\b/i,
    /\b(that word|this word|the word)\b/i,
    /\b(that verb|this verb|the verb)\b/i
  ];

  // ── Follow-up Detection ────────────────────────────────────
  var followUpPatterns = [
    { pattern: /\b(what about|how about|and)\s+(.+)/i, type: 'topic_shift' },
    { pattern: /\b(and|but)\s+(in|for)\s+(the\s+)?(past|present|future|preterite|imperfect|conditional|subjunctive)/i, type: 'tense_change' },
    { pattern: /\b(another|more|next|different)\s+(example|one|word|phrase|sentence)/i, type: 'more_examples' },
    { pattern: /\b(again|repeat|say that again|one more time)\b/i, type: 'repeat' },
    { pattern: /\b(yes|yeah|yep|sure|ok|okay|please|go ahead)\b/i, type: 'affirm' },
    { pattern: /\b(no|nope|nah|not really|never mind|cancel)\b/i, type: 'deny' },
    { pattern: /\b(go back|previous|before|back to)\b/i, type: 'go_back' },
    { pattern: /\b(explain more|more detail|elaborate|tell me more|what do you mean)\b/i, type: 'elaborate' },
    { pattern: /\b(in (spanish|english))\b/i, type: 'language_switch' },
    { pattern: /\b(now|next)\s+(teach|show|give|tell)\b/i, type: 'continue' },
    { pattern: /^(why|how|when|where)\??\s*$/i, type: 'clarify' },
    { pattern: /\b(use it in a sentence|give me an example|for example)\b/i, type: 'example_request' },
    { pattern: /\b(what's the difference|compare|versus|vs\.?)\b/i, type: 'compare' },
    { pattern: /\b(conjugate it|conjugate that)\b/i, type: 'conjugate_last' },
    { pattern: /\b(translate it|translate that|in spanish|in english)\b/i, type: 'translate_last' }
  ];

  // ── Core Functions ─────────────────────────────────────────

  /**
   * Push a new turn into conversation history.
   */
  function pushTurn(input, intent, entities, response) {
    turnCount++;
    var turn = {
      input: input,
      intent: intent,
      entities: entities || {},
      response: response || '',
      timestamp: Date.now(),
      turnNumber: turnCount
    };
    history.push(turn);
    if (history.length > MAX_HISTORY) {
      history.shift();
    }

    // Update current topic and entity based on intent and entities
    _updateTopicFromIntent(intent, entities);

    return turn;
  }

  /**
   * Get the last N turns of conversation.
   */
  function getRecentHistory(n) {
    n = n || 5;
    return history.slice(-n);
  }

  /**
   * Get the last turn.
   */
  function getLastTurn() {
    return history.length > 0 ? history[history.length - 1] : null;
  }

  /**
   * Get the last N turns as formatted messages for the LLM.
   */
  function getFormattedHistory(n) {
    n = n || 10;
    var recent = history.slice(-n);
    var messages = [];
    for (var i = 0; i < recent.length; i++) {
      messages.push({ role: 'user', content: recent[i].input });
      if (recent[i].response) {
        // Strip HTML tags for the LLM context
        var plainResponse = recent[i].response.replace(/<[^>]*>/g, '').substring(0, 500);
        messages.push({ role: 'assistant', content: plainResponse });
      }
    }
    return messages;
  }

  /**
   * Resolve anaphoric references ("it", "that", "this one", etc.)
   * Returns the resolved text with references replaced, or original text if no resolution.
   */
  function resolveAnaphora(text) {
    if (!currentEntity) return { text: text, resolved: false };

    var resolved = text;
    var wasResolved = false;

    for (var i = 0; i < anaphoricPatterns.length; i++) {
      if (anaphoricPatterns[i].test(resolved)) {
        // Replace the anaphoric reference with the current entity
        if (typeof currentEntity === 'string') {
          resolved = resolved.replace(anaphoricPatterns[i], currentEntity);
          wasResolved = true;
        } else if (currentEntity.word) {
          resolved = resolved.replace(anaphoricPatterns[i], currentEntity.word);
          wasResolved = true;
        } else if (currentEntity.verb) {
          resolved = resolved.replace(anaphoricPatterns[i], currentEntity.verb);
          wasResolved = true;
        }
        break; // Only resolve the first reference
      }
    }

    return { text: resolved, resolved: wasResolved, entity: currentEntity };
  }

  /**
   * Detect if user input is a follow-up to the previous turn.
   * Returns {isFollowUp, type, extractedTopic} or null.
   */
  function detectFollowUp(text) {
    var trimmed = text.trim();

    // Very short inputs are likely follow-ups
    var isShort = trimmed.split(/\s+/).length <= 4;

    for (var i = 0; i < followUpPatterns.length; i++) {
      var match = trimmed.match(followUpPatterns[i].pattern);
      if (match) {
        return {
          isFollowUp: true,
          type: followUpPatterns[i].type,
          match: match,
          extractedTopic: match[2] || null,
          previousTurn: getLastTurn()
        };
      }
    }

    // If it's a single word that could be a topic shift
    if (isShort && currentTopic) {
      // Check if the input is just a word (possible vocabulary query in context)
      if (/^[a-záéíóúñü]+$/i.test(trimmed)) {
        return {
          isFollowUp: true,
          type: 'implicit_topic_continuation',
          match: null,
          extractedTopic: trimmed,
          previousTurn: getLastTurn()
        };
      }
    }

    return { isFollowUp: false, type: null, match: null, extractedTopic: null, previousTurn: null };
  }

  /**
   * Get contextual information for the LLM system prompt.
   * Returns a summary of current conversation state.
   */
  function getContextSummary() {
    var summary = {
      state: conversationState,
      topic: currentTopic,
      entity: currentEntity,
      turnCount: turnCount,
      sessionDuration: Math.floor((Date.now() - sessionStart) / 60000), // minutes
      recentIntents: _getRecentIntents(5),
      topicStack: topicStack.slice(-3)
    };
    return summary;
  }

  /**
   * Get current conversation state.
   */
  function getState() {
    return conversationState;
  }

  /**
   * Set conversation state.
   */
  function setState(newState) {
    var validStates = ['idle', 'topic_active', 'quiz_active', 'reading_active', 'dialogue_active', 'writing_active', 'review_active'];
    if (validStates.indexOf(newState) !== -1) {
      conversationState = newState;
    }
    return conversationState;
  }

  /**
   * Get current topic.
   */
  function getTopic() {
    return currentTopic;
  }

  /**
   * Set current topic and push to stack.
   */
  function setTopic(topic) {
    if (currentTopic && currentTopic !== topic) {
      topicStack.push(currentTopic);
      if (topicStack.length > 10) topicStack.shift();
    }
    currentTopic = topic;
    return currentTopic;
  }

  /**
   * Get current entity (last word/verb/topic discussed).
   */
  function getEntity() {
    return currentEntity;
  }

  /**
   * Set current entity.
   */
  function setEntity(entity) {
    currentEntity = entity;
    return currentEntity;
  }

  /**
   * Go back to previous topic.
   */
  function goBack() {
    if (topicStack.length > 0) {
      currentTopic = topicStack.pop();
      return currentTopic;
    }
    return null;
  }

  /**
   * Build context string for the LLM, summarizing recent conversation.
   */
  function buildLLMContext() {
    var parts = [];

    // Current state
    if (conversationState !== 'idle') {
      parts.push('Current mode: ' + conversationState);
    }

    // Current topic
    if (currentTopic) {
      parts.push('Current topic: ' + currentTopic);
    }

    // Current entity
    if (currentEntity) {
      if (typeof currentEntity === 'string') {
        parts.push('Last discussed: ' + currentEntity);
      } else {
        var entityParts = [];
        if (currentEntity.word) entityParts.push('word: ' + currentEntity.word);
        if (currentEntity.verb) entityParts.push('verb: ' + currentEntity.verb);
        if (currentEntity.tense) entityParts.push('tense: ' + currentEntity.tense);
        if (currentEntity.category) entityParts.push('category: ' + currentEntity.category);
        if (currentEntity.grammarTopic) entityParts.push('grammar: ' + currentEntity.grammarTopic);
        if (entityParts.length > 0) {
          parts.push('Last discussed: ' + entityParts.join(', '));
        }
      }
    }

    // Session info
    var duration = Math.floor((Date.now() - sessionStart) / 60000);
    parts.push('Session: ' + turnCount + ' turns, ' + duration + ' minutes');

    // Recent intent pattern
    var recentIntents = _getRecentIntents(5);
    if (recentIntents.length > 0) {
      parts.push('Recent intents: ' + recentIntents.join(' → '));
    }

    return parts.join('\n');
  }

  /**
   * Check if the conversation is in a specific state.
   */
  function isInState(state) {
    return conversationState === state;
  }

  /**
   * Reset conversation context.
   */
  function reset() {
    history = [];
    currentTopic = null;
    currentEntity = null;
    conversationState = 'idle';
    topicStack = [];
    turnCount = 0;
    sessionStart = Date.now();
  }

  /**
   * Get full conversation history for export/analysis.
   */
  function getFullHistory() {
    return history.slice();
  }

  /**
   * Get statistics about the conversation.
   */
  function getStats() {
    var intentCounts = {};
    for (var i = 0; i < history.length; i++) {
      var intent = history[i].intent || 'unknown';
      intentCounts[intent] = (intentCounts[intent] || 0) + 1;
    }

    var topIntents = Object.keys(intentCounts).sort(function (a, b) {
      return intentCounts[b] - intentCounts[a];
    }).slice(0, 5);

    return {
      totalTurns: turnCount,
      sessionDuration: Math.floor((Date.now() - sessionStart) / 60000),
      topIntents: topIntents.map(function (k) { return { intent: k, count: intentCounts[k] }; }),
      currentState: conversationState,
      currentTopic: currentTopic,
      historyLength: history.length
    };
  }

  // ── Private Helpers ────────────────────────────────────────

  function _updateTopicFromIntent(intent, entities) {
    if (!intent) return;

    // Map intents to topics
    var intentTopicMap = {
      'translate_to_spanish': 'translation',
      'translate_to_english': 'translation',
      'conjugate_verb': 'conjugation',
      'explain_grammar': 'grammar',
      'vocabulary_lesson': 'vocabulary',
      'quiz_start': 'quiz',
      'quiz_answer': 'quiz',
      'phrase_request': 'phrases',
      'pronunciation_help': 'pronunciation',
      'cultural_info': 'culture',
      'practice_conversation': 'conversation',
      'correct_spanish': 'correction',
      'word_of_day': 'vocabulary',
      'start_reading': 'reading',
      'start_writing': 'writing',
      'start_dialogue': 'dialogue',
      'review_srs': 'review',
      'show_achievements': 'gamification',
      'daily_challenge': 'challenge',
      'idiom_request': 'idioms',
      'lesson_request': 'lesson'
    };

    var newTopic = intentTopicMap[intent];
    if (newTopic) {
      setTopic(newTopic);
    }

    // Update current entity from entities
    if (entities) {
      if (entities.wordToTranslate) {
        setEntity({ word: entities.wordToTranslate, type: 'translation' });
      } else if (entities.verbToConjugate) {
        setEntity({ verb: entities.verbToConjugate, tense: entities.tense, type: 'conjugation' });
      } else if (entities.grammarTopic) {
        setEntity({ grammarTopic: entities.grammarTopic, type: 'grammar' });
      } else if (entities.category) {
        setEntity({ category: entities.category, type: 'vocabulary' });
      }
    }

    // Update state
    if (intent === 'quiz_start') setState('quiz_active');
    else if (intent === 'start_reading') setState('reading_active');
    else if (intent === 'start_dialogue') setState('dialogue_active');
    else if (intent === 'start_writing') setState('writing_active');
    else if (intent === 'review_srs') setState('review_active');
    else if (conversationState !== 'idle' && intent !== 'quiz_answer') {
      // Stay in current state for quiz answers, etc.
      if (['greeting', 'farewell', 'help', 'about_self'].indexOf(intent) !== -1) {
        setState('idle');
      }
    }
  }

  function _getRecentIntents(n) {
    var recent = history.slice(-(n || 5));
    var intents = [];
    for (var i = 0; i < recent.length; i++) {
      if (recent[i].intent) {
        intents.push(recent[i].intent);
      }
    }
    return intents;
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    pushTurn: pushTurn,
    getRecentHistory: getRecentHistory,
    getLastTurn: getLastTurn,
    getFormattedHistory: getFormattedHistory,
    resolveAnaphora: resolveAnaphora,
    detectFollowUp: detectFollowUp,
    getContextSummary: getContextSummary,
    getState: getState,
    setState: setState,
    getTopic: getTopic,
    setTopic: setTopic,
    getEntity: getEntity,
    setEntity: setEntity,
    goBack: goBack,
    buildLLMContext: buildLLMContext,
    isInState: isInState,
    reset: reset,
    getFullHistory: getFullHistory,
    getStats: getStats
  };
})();
