// ============================================================
// Entity Extractor — pulls out words to translate, verb
// infinitives, tenses, topics, numbers from user input
// ============================================================
var Entities = (function () {
  'use strict';

  var TENSES = {
    'present':            'present',
    'present tense':      'present',
    'presente':           'present',
    'preterite':          'preterite',
    'preterit':           'preterite',
    'past':               'preterite',
    'past tense':         'preterite',
    'pretérito':          'preterite',
    'imperfect':          'imperfect',
    'imperfecto':         'imperfect',
    'future':             'future',
    'future tense':       'future',
    'futuro':             'future',
    'conditional':        'conditional',
    'condicional':        'conditional',
    'subjunctive':        'subjunctive',
    'present subjunctive':'subjunctive',
    'subjuntivo':         'subjunctive'
  };

  var CATEGORIES = [
    'food','colors','colour','numbers','family','animals','body',
    'body parts','clothing','clothes','house','home','nature',
    'professions','jobs','time','weather','emotions','feelings',
    'travel','school','education','greetings','restaurant',
    'shopping','directions','hotel','emergency','phone',
    'small talk','opinions','introductions','sports','music',
    'health','transportation','days','months','seasons'
  ];

  var GRAMMAR_TOPICS = [
    'ser vs estar','ser estar','ser and estar',
    'por vs para','por para','por and para',
    'gender','gender agreement','masculine feminine',
    'articles','el la los las','un una',
    'adjective','adjective placement','adjectives',
    'pronouns','object pronouns','direct object','indirect object',
    'reflexive','reflexive verbs',
    'subjunctive','subjunctive triggers',
    'comparatives','superlatives','comparison',
    'negation','negative','double negative',
    'preterite vs imperfect','preterite imperfect',
    'conjugation','verb tenses','tenses',
    'accents','accent marks','tildes',
    'question words','interrogatives',
    'prepositions'
  ];

  /**
   * Extract entities from user text. Returns an object with:
   * - wordToTranslate: string or null
   * - verbToConjugate: string or null
   * - tense: string or null
   * - category: string or null
   * - grammarTopic: string or null
   * - number: number or null
   * - spanishText: string or null (raw Spanish text detected)
   */
  function extract(text) {
    var lower = text.toLowerCase().trim();
    var result = {
      wordToTranslate: null,
      verbToConjugate: null,
      tense: null,
      category: null,
      grammarTopic: null,
      number: null,
      spanishText: null
    };

    // --- Detect tense ---
    var tenseKeys = Object.keys(TENSES);
    for (var i = 0; i < tenseKeys.length; i++) {
      if (lower.indexOf(tenseKeys[i]) !== -1) {
        result.tense = TENSES[tenseKeys[i]];
        break;
      }
    }

    // --- Detect category ---
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (lower.indexOf(CATEGORIES[i]) !== -1) {
        result.category = CATEGORIES[i];
        break;
      }
    }

    // --- Detect grammar topic ---
    for (var i = 0; i < GRAMMAR_TOPICS.length; i++) {
      if (lower.indexOf(GRAMMAR_TOPICS[i]) !== -1) {
        result.grammarTopic = GRAMMAR_TOPICS[i];
        break;
      }
    }

    // --- Extract word to translate ---
    // Patterns: "how do you say X in spanish", "translate X to spanish",
    // "what is X in spanish", "how to say X", "translate X",
    // "what does X mean", "meaning of X"
    var translatePatterns = [
      /how (?:do (?:you|i|we)|to) say ['"]?(.+?)['"]? in spanish/i,
      /translate ['"]?(.+?)['"]? (?:to|into) spanish/i,
      /what(?:'s| is) ['"]?(.+?)['"]? in spanish/i,
      /spanish (?:word |translation )?for ['"]?(.+?)['"]?$/i,
      /translate ['"]?(.+?)['"]?$/i,
      /how (?:do (?:you|i|we)|to) say ['"]?(.+?)['"]?$/i,
      /what does ['"]?(.+?)['"]? mean/i,
      /meaning of ['"]?(.+?)['"]?$/i,
      /what(?:'s| is) ['"]?(.+?)['"]? in english/i
    ];
    for (var i = 0; i < translatePatterns.length; i++) {
      var m = lower.match(translatePatterns[i]);
      if (m) {
        result.wordToTranslate = m[1].trim();
        break;
      }
    }

    // --- Extract verb to conjugate ---
    var conjugatePatterns = [
      /conjugat[e]? ['"]?(.+?)['"]? (?:in|for)/i,
      /conjugat[e]? (?:the verb )?['"]?(.+?)['"]?$/i,
      /conjugation of ['"]?(.+?)['"]?/i,
      /how (?:do you |to )?conjugat[e]? ['"]?(.+?)['"]?/i
    ];
    for (var i = 0; i < conjugatePatterns.length; i++) {
      var m = lower.match(conjugatePatterns[i]);
      if (m) {
        var verb = (m[1] || m[2] || '').trim();
        // Clean trailing tense words
        verb = verb.replace(/\s+(in|for)\s+.*$/, '').trim();
        if (verb) result.verbToConjugate = verb;
        break;
      }
    }

    // --- Extract number ---
    var numMatch = lower.match(/\b(\d+)\b/);
    if (numMatch) {
      result.number = parseInt(numMatch[1], 10);
    }

    // --- Detect Spanish text (accented chars, ñ, ¿, ¡) ---
    var spanishChars = /[áéíóúüñ¿¡]/;
    if (spanishChars.test(lower)) {
      result.spanishText = text.trim();
    }

    return result;
  }

  return {
    extract: extract,
    TENSES: TENSES,
    CATEGORIES: CATEGORIES,
    GRAMMAR_TOPICS: GRAMMAR_TOPICS
  };
})();
