// ============================================================
// Spaced Repetition System — SM-2 algorithm for vocabulary retention
// ============================================================
var SRS = (function () {
  'use strict';

  var STORAGE_KEY = 'profesor_srs_deck';

  // ── Card Data ──────────────────────────────────────────────
  var deck = [];      // All flashcards
  var stats = {
    totalReviews: 0,
    correctReviews: 0,
    cardsAdded: 0,
    cardsRetired: 0
  };

  // ── SM-2 Algorithm Constants ───────────────────────────────
  var MIN_EASE_FACTOR = 1.3;
  var DEFAULT_EASE_FACTOR = 2.5;
  var GRADUATING_INTERVAL = 1;    // days
  var EASY_INTERVAL = 4;          // days
  var MAX_INTERVAL = 365;         // maximum days between reviews

  // ── Card Types ─────────────────────────────────────────────
  var CARD_TYPES = {
    VOCABULARY: 'vocabulary',
    CONJUGATION: 'conjugation',
    GRAMMAR: 'grammar',
    PHRASE: 'phrase',
    IDIOM: 'idiom',
    SENTENCE: 'sentence'
  };

  // ── Quality Ratings (SM-2) ─────────────────────────────────
  // 0 = complete blackout
  // 1 = incorrect; correct answer remembered upon seeing it
  // 2 = incorrect; correct answer seemed easy to recall
  // 3 = correct response with serious difficulty
  // 4 = correct response after some hesitation
  // 5 = perfect response
  var QUALITY = {
    BLACKOUT: 0,
    WRONG_REMEMBERED: 1,
    WRONG_EASY: 2,
    CORRECT_HARD: 3,
    CORRECT_OK: 4,
    PERFECT: 5
  };

  // ── Initialization ─────────────────────────────────────────
  function load() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var data = JSON.parse(saved);
        deck = data.deck || [];
        stats = data.stats || stats;
      }
    } catch (e) {
      console.warn('SRS: Could not load saved deck', e);
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        deck: deck,
        stats: stats
      }));
    } catch (e) {
      console.warn('SRS: Could not save deck', e);
    }
  }

  // ── Card Management ────────────────────────────────────────

  /**
   * Create a new flashcard and add to deck.
   * @param {string} type - CARD_TYPES value
   * @param {string} front - Question/prompt side
   * @param {string} back - Answer side
   * @param {object} metadata - Additional data (category, tense, etc.)
   * @returns {object} The created card, or null if duplicate
   */
  function addCard(type, front, back, metadata) {
    // Check for duplicates
    for (var i = 0; i < deck.length; i++) {
      if (deck[i].front === front && deck[i].back === back) {
        return null; // Already exists
      }
    }

    var card = {
      id: _generateId(),
      type: type || CARD_TYPES.VOCABULARY,
      front: front,
      back: back,
      metadata: metadata || {},
      // SM-2 fields
      easeFactor: DEFAULT_EASE_FACTOR,
      interval: 0,          // days until next review
      repetitions: 0,       // number of consecutive correct reviews
      nextReview: Date.now(), // timestamp of next review
      // History
      created: Date.now(),
      lastReviewed: null,
      totalReviews: 0,
      correctReviews: 0,
      // State
      state: 'new'  // new | learning | review | retired
    };

    deck.push(card);
    stats.cardsAdded++;
    save();
    return card;
  }

  /**
   * Auto-generate a vocabulary card from a dictionary entry.
   */
  function addVocabularyCard(entry) {
    if (!entry || !entry.en || !entry.es) return null;
    return addCard(
      CARD_TYPES.VOCABULARY,
      'What is "' + entry.en + '" in Spanish?',
      entry.es + (entry.pronunciation ? ' (' + entry.pronunciation + ')' : ''),
      { english: entry.en, spanish: entry.es, category: entry.category }
    );
  }

  /**
   * Auto-generate a conjugation card.
   */
  function addConjugationCard(verb, tense, pronoun, form) {
    return addCard(
      CARD_TYPES.CONJUGATION,
      'Conjugate "' + verb + '" for ' + pronoun + ' (' + tense + ')',
      form,
      { verb: verb, tense: tense, pronoun: pronoun }
    );
  }

  /**
   * Auto-generate a phrase card.
   */
  function addPhraseCard(spanish, english, situation) {
    return addCard(
      CARD_TYPES.PHRASE,
      'How do you say: "' + english + '"?',
      spanish,
      { situation: situation }
    );
  }

  /**
   * Review a card with a quality rating.
   * Implements the SM-2 algorithm.
   * @param {string} cardId
   * @param {number} quality - 0 to 5
   * @returns {object} Updated card
   */
  function reviewCard(cardId, quality) {
    var card = _findCard(cardId);
    if (!card) return null;

    quality = Math.max(0, Math.min(5, quality));

    // Update stats
    stats.totalReviews++;
    card.totalReviews++;
    card.lastReviewed = Date.now();

    if (quality >= 3) {
      card.correctReviews++;
      stats.correctReviews++;
    }

    // SM-2 Algorithm
    if (quality >= 3) {
      // Correct response
      if (card.repetitions === 0) {
        card.interval = GRADUATING_INTERVAL;
      } else if (card.repetitions === 1) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }
      card.repetitions++;
      card.state = 'review';
    } else {
      // Incorrect response — reset
      card.repetitions = 0;
      card.interval = GRADUATING_INTERVAL;
      card.state = 'learning';
    }

    // Update ease factor
    card.easeFactor = card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (card.easeFactor < MIN_EASE_FACTOR) card.easeFactor = MIN_EASE_FACTOR;

    // Cap interval
    if (card.interval > MAX_INTERVAL) card.interval = MAX_INTERVAL;

    // Set next review date
    card.nextReview = Date.now() + (card.interval * 24 * 60 * 60 * 1000);

    // Retire well-known cards
    if (card.interval >= 180 && card.repetitions >= 10 && card.easeFactor > 2.5) {
      card.state = 'retired';
      stats.cardsRetired++;
    }

    save();
    return card;
  }

  /**
   * Get all cards due for review (nextReview <= now).
   * @param {number} limit - Maximum cards to return
   * @returns {Array} Due cards sorted by priority
   */
  function getDueCards(limit) {
    limit = limit || 20;
    var now = Date.now();
    var due = [];

    for (var i = 0; i < deck.length; i++) {
      if (deck[i].state !== 'retired' && deck[i].nextReview <= now) {
        due.push(deck[i]);
      }
    }

    // Sort: new cards first, then by overdue amount
    due.sort(function (a, b) {
      if (a.state === 'new' && b.state !== 'new') return -1;
      if (b.state === 'new' && a.state !== 'new') return 1;
      return a.nextReview - b.nextReview;
    });

    return due.slice(0, limit);
  }

  /**
   * Get new cards that haven't been reviewed yet.
   */
  function getNewCards(limit) {
    limit = limit || 10;
    var newCards = [];
    for (var i = 0; i < deck.length; i++) {
      if (deck[i].state === 'new') {
        newCards.push(deck[i]);
        if (newCards.length >= limit) break;
      }
    }
    return newCards;
  }

  /**
   * Get deck statistics.
   */
  function getStats() {
    var now = Date.now();
    var counts = { new: 0, learning: 0, review: 0, retired: 0, due: 0 };

    for (var i = 0; i < deck.length; i++) {
      counts[deck[i].state] = (counts[deck[i].state] || 0) + 1;
      if (deck[i].state !== 'retired' && deck[i].nextReview <= now) {
        counts.due++;
      }
    }

    return {
      total: deck.length,
      new: counts.new,
      learning: counts.learning,
      review: counts.review,
      retired: counts.retired,
      due: counts.due,
      totalReviews: stats.totalReviews,
      correctReviews: stats.correctReviews,
      accuracy: stats.totalReviews > 0 ? Math.round((stats.correctReviews / stats.totalReviews) * 100) : 0
    };
  }

  /**
   * Format a review session as HTML.
   * @param {Array} cards - Cards to review
   * @param {number} currentIndex - Current card index
   * @param {boolean} showAnswer - Whether to show the answer
   */
  function formatReviewCard(card, showAnswer) {
    if (!card) {
      return '<div class="srs-complete">🎉 <strong>All caught up!</strong> No cards due for review right now. Come back later!</div>';
    }

    var html = '<div class="srs-card">';
    html += '<div class="srs-card-type">' + _getTypeIcon(card.type) + ' ' + _formatType(card.type) + '</div>';
    html += '<div class="srs-card-front">' + _escapeHtml(card.front) + '</div>';

    if (showAnswer) {
      html += '<div class="srs-card-divider">───────────</div>';
      html += '<div class="srs-card-back">' + _escapeHtml(card.back) + '</div>';
      html += '<div class="srs-card-buttons">';
      html += '<p>How well did you know this? Rate 1-5:</p>';
      html += '<div class="srs-rating-buttons">';
      html += '<button class="srs-btn srs-btn-1" data-card-id="' + card.id + '" data-quality="1">1 — Didn\'t know</button>';
      html += '<button class="srs-btn srs-btn-2" data-card-id="' + card.id + '" data-quality="2">2 — Wrong, easy</button>';
      html += '<button class="srs-btn srs-btn-3" data-card-id="' + card.id + '" data-quality="3">3 — Hard</button>';
      html += '<button class="srs-btn srs-btn-4" data-card-id="' + card.id + '" data-quality="4">4 — Good</button>';
      html += '<button class="srs-btn srs-btn-5" data-card-id="' + card.id + '" data-quality="5">5 — Perfect</button>';
      html += '</div></div>';
    } else {
      html += '<div class="srs-card-prompt">Type <strong>"show"</strong> or <strong>"flip"</strong> to see the answer.</div>';
    }

    // Card info
    html += '<div class="srs-card-info">';
    html += 'Reviews: ' + card.totalReviews;
    html += ' | Streak: ' + card.repetitions;
    html += ' | Ease: ' + card.easeFactor.toFixed(1);
    if (card.interval > 0) html += ' | Next: ' + card.interval + 'd';
    html += '</div>';

    html += '</div>';
    return html;
  }

  /**
   * Format deck overview as HTML.
   */
  function formatDeckOverview() {
    var s = getStats();

    var html = '<div class="srs-overview">';
    html += '<div class="srs-title">📚 Flashcard Deck Overview</div>';

    // Stats grid
    html += '<div class="srs-stats-grid">';
    html += '<div class="srs-stat"><div class="srs-stat-value">' + s.total + '</div><div class="srs-stat-label">Total Cards</div></div>';
    html += '<div class="srs-stat"><div class="srs-stat-value srs-due">' + s.due + '</div><div class="srs-stat-label">Due Now</div></div>';
    html += '<div class="srs-stat"><div class="srs-stat-value">' + s.new + '</div><div class="srs-stat-label">New</div></div>';
    html += '<div class="srs-stat"><div class="srs-stat-value">' + s.learning + '</div><div class="srs-stat-label">Learning</div></div>';
    html += '<div class="srs-stat"><div class="srs-stat-value">' + s.review + '</div><div class="srs-stat-label">Review</div></div>';
    html += '<div class="srs-stat"><div class="srs-stat-value">' + s.retired + '</div><div class="srs-stat-label">Mastered</div></div>';
    html += '</div>';

    // Accuracy
    if (s.totalReviews > 0) {
      html += '<div class="srs-accuracy">';
      html += '<div class="srs-accuracy-bar"><div class="srs-accuracy-fill" style="width:' + s.accuracy + '%"></div></div>';
      html += '<span>' + s.accuracy + '% accuracy (' + s.correctReviews + '/' + s.totalReviews + ' reviews)</span>';
      html += '</div>';
    }

    if (s.due > 0) {
      html += '<p>You have <strong>' + s.due + ' cards</strong> due for review! Type <strong>"review"</strong> to start.</p>';
    } else {
      html += '<p>🎉 All caught up! Your next review will be ready later.</p>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Format a review session summary.
   */
  function formatSessionSummary(reviewed, correct, total) {
    var pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    var html = '<div class="srs-summary">';
    html += '<div class="srs-summary-title">📊 Review Session Complete!</div>';
    html += '<div class="srs-summary-stats">';
    html += '<div>Cards reviewed: <strong>' + reviewed + '</strong></div>';
    html += '<div>Correct: <strong>' + correct + '/' + total + '</strong> (' + pct + '%)</div>';
    html += '</div>';

    if (pct === 100) {
      html += '<div class="srs-summary-message">🌟 Perfect session! Every card nailed!</div>';
    } else if (pct >= 80) {
      html += '<div class="srs-summary-message">💪 Great work! Keep it up!</div>';
    } else if (pct >= 60) {
      html += '<div class="srs-summary-message">👍 Good effort! The tricky ones will come back for more practice.</div>';
    } else {
      html += '<div class="srs-summary-message">📖 Keep practicing! The SRS system will help you remember over time.</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Delete a card from the deck.
   */
  function removeCard(cardId) {
    for (var i = 0; i < deck.length; i++) {
      if (deck[i].id === cardId) {
        deck.splice(i, 1);
        save();
        return true;
      }
    }
    return false;
  }

  /**
   * Get all cards of a specific type.
   */
  function getCardsByType(type) {
    return deck.filter(function (c) { return c.type === type; });
  }

  /**
   * Reset the entire SRS deck.
   */
  function resetDeck() {
    deck = [];
    stats = { totalReviews: 0, correctReviews: 0, cardsAdded: 0, cardsRetired: 0 };
    save();
  }

  /**
   * Export deck as JSON string.
   */
  function exportDeck() {
    return JSON.stringify({ deck: deck, stats: stats, exportDate: new Date().toISOString() });
  }

  /**
   * Get count of due cards.
   */
  function getDueCount() {
    var now = Date.now();
    var count = 0;
    for (var i = 0; i < deck.length; i++) {
      if (deck[i].state !== 'retired' && deck[i].nextReview <= now) count++;
    }
    return count;
  }

  // ── SRS Review Session State ───────────────────────────────
  var session = {
    active: false,
    cards: [],
    currentIndex: 0,
    showingAnswer: false,
    correct: 0,
    reviewed: 0
  };

  function startSession(limit) {
    var due = getDueCards(limit || 10);
    if (due.length === 0) return null;

    session.active = true;
    session.cards = due;
    session.currentIndex = 0;
    session.showingAnswer = false;
    session.correct = 0;
    session.reviewed = 0;

    return formatReviewCard(session.cards[0], false);
  }

  function showSessionAnswer() {
    if (!session.active || session.currentIndex >= session.cards.length) return null;
    session.showingAnswer = true;
    return formatReviewCard(session.cards[session.currentIndex], true);
  }

  function rateSessionCard(quality) {
    if (!session.active || session.currentIndex >= session.cards.length) return null;

    quality = parseInt(quality, 10);
    if (isNaN(quality) || quality < 1 || quality > 5) return null;

    var card = session.cards[session.currentIndex];
    reviewCard(card.id, quality);
    session.reviewed++;
    if (quality >= 3) session.correct++;
    session.currentIndex++;
    session.showingAnswer = false;

    if (session.currentIndex >= session.cards.length) {
      session.active = false;
      return formatSessionSummary(session.reviewed, session.correct, session.reviewed);
    }

    return formatReviewCard(session.cards[session.currentIndex], false);
  }

  function isSessionActive() {
    return session.active;
  }

  function cancelSession() {
    session.active = false;
    return '<p>Review session cancelled. You reviewed <strong>' + session.reviewed + '</strong> cards.</p>';
  }

  // ── Private Helpers ────────────────────────────────────────

  function _generateId() {
    return 'srs_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  }

  function _findCard(cardId) {
    for (var i = 0; i < deck.length; i++) {
      if (deck[i].id === cardId) return deck[i];
    }
    return null;
  }

  function _getTypeIcon(type) {
    var icons = {
      vocabulary: '📝',
      conjugation: '🔄',
      grammar: '📖',
      phrase: '💬',
      idiom: '🎭',
      sentence: '✍️'
    };
    return icons[type] || '📋';
  }

  function _formatType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  function _escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * Pre-seed deck with Unidad 2A1 vocabulary cards (if not already seeded).
   * Call this on first load to ensure all 27 terms are available as flashcards.
   */
  function seedUnidad2A1() {
    if (typeof Dictionary === 'undefined') return;
    var unitWords = Dictionary.getCategory('unidad2a1');
    if (!unitWords || unitWords.length === 0) return;

    var seeded = false;
    for (var i = 0; i < unitWords.length; i++) {
      var entry = unitWords[i];
      // Add ES→EN card
      var card1 = addCard(
        CARD_TYPES.VOCABULARY,
        '¿Qué significa "' + entry.es + '"?',
        entry.en + (entry.pronunciation ? ' (' + entry.pronunciation + ')' : ''),
        { english: entry.en, spanish: entry.es, category: 'unidad2a1', direction: 'es_to_en' }
      );
      // Add EN→ES card
      var card2 = addCard(
        CARD_TYPES.VOCABULARY,
        'What is "' + entry.en + '" in Spanish?',
        entry.es + (entry.pronunciation ? ' (' + entry.pronunciation + ')' : ''),
        { english: entry.en, spanish: entry.es, category: 'unidad2a1', direction: 'en_to_es' }
      );
      if (card1 || card2) seeded = true;
    }
    if (seeded) save();
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    CARD_TYPES: CARD_TYPES,
    QUALITY: QUALITY,
    load: load,
    save: save,
    addCard: addCard,
    addVocabularyCard: addVocabularyCard,
    addConjugationCard: addConjugationCard,
    addPhraseCard: addPhraseCard,
    reviewCard: reviewCard,
    getDueCards: getDueCards,
    getNewCards: getNewCards,
    getDueCount: getDueCount,
    getStats: getStats,
    formatReviewCard: formatReviewCard,
    formatDeckOverview: formatDeckOverview,
    formatSessionSummary: formatSessionSummary,
    removeCard: removeCard,
    getCardsByType: getCardsByType,
    resetDeck: resetDeck,
    exportDeck: exportDeck,
    startSession: startSession,
    showSessionAnswer: showSessionAnswer,
    rateSessionCard: rateSessionCard,
    isSessionActive: isSessionActive,
    cancelSession: cancelSession,
    seedUnidad2A1: seedUnidad2A1
  };
})();
