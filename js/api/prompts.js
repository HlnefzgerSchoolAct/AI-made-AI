// ============================================================
// System Prompts & Context Builder — constructs the messages
// array for the Hack Club AI API, managing persona, context,
// conversation history, and mode-specific instructions.
// ============================================================
var Prompts = (function () {
  'use strict';

  // ---- Master system prompt ----
  var SYSTEM_PROMPT = [
    'You are the study assistant for "3rd Hour Spanish" — a Spanish 3 class using the ¡Qué Chévere! Level 2 textbook.',
    'You help students in this class practice vocabulary, conjugation, grammar, and conversation.',
    '',
    'CURRENT UNIT: Unidad 2A1 — La rutina diaria (The Daily Routine).',
    'This unit focuses on reflexive verbs and bathroom/morning routine vocabulary.',
    '',
    'UNIT VOCABULARY (27 terms):',
    '• bañarse — to bathe',
    '• cepillarse — to brush',
    '• el cepillo — brush',
    '• el champú — shampoo',
    '• la crema de afeitar — shaving cream',
    '• el desodorante — deodorant',
    '• despertarse (ie) — to wake up (stem-changing: me despierto)',
    '• la ducha — shower',
    '• ducharse — to shower',
    '• el espejo — mirror',
    '• el grifo — faucet',
    '• el inodoro — toilet',
    '• el jabón — soap',
    '• el lavabo — sink',
    '• lavarse — to wash',
    '• levantarse — to get up',
    '• el maquillaje — makeup',
    '• maquillarse — to put on makeup',
    '• peinarse — to comb',
    '• el peine — comb',
    '• el pelo — hair',
    '• ponerse — to put on',
    '• quitarse — to take off',
    '• tarde — late',
    '• la tina — bathtub',
    '• la toalla — towel',
    '• vestirse (i, i) — to get dressed (stem-changing: me visto)',
    '',
    'KEY GRAMMAR: Reflexive verbs and reflexive pronouns (me, te, se, nos, os, se).',
    '• Reflexive pronouns go BEFORE the conjugated verb: Me despierto a las siete.',
    '• Or ATTACHED to infinitives/gerunds: Voy a despertarme. / Estoy despertándome.',
    '• Stem-changing: despertarse (e→ie in present: me despierto, te despiertas...)',
    '• Stem-changing: vestirse (e→i in present: me visto, te vistes...)',
    '',
    'STUDENT LEVEL: Intermediate (Spanish 3). Students already know present tense, preterite, imperfect,',
    'basic vocabulary, ser vs estar, and common irregular verbs. They are now learning reflexive verbs in depth.',
    '',
    'PERSONALITY & STYLE:',
    '• Be warm, encouraging, and class-focused.',
    '• Use occasional Spanish (¡Muy bien!, ¡Excelente!) but respond primarily in English.',
    '• Always include accents and special characters: á, é, í, ó, ú, ñ, ¿, ¡.',
    '• When teaching vocabulary, include: Spanish, English translation, and pronunciation guide.',
    '• Keep responses concise and relevant to the current unit.',
    '• Format with HTML: <strong> for emphasis, <br> for line breaks, bullet lists.',
    '',
    'CORE CAPABILITIES:',
    '• Quiz students on the 27 Unidad 2A1 vocabulary terms.',
    '• Conjugate reflexive verbs with correct pronoun placement.',
    '• Explain reflexive verb grammar with unit-specific examples.',
    '• Practice daily routine conversations in Spanish.',
    '• Correct student Spanish and explain errors.',
    '• Provide pronunciation guides in CAPS: e.g., "bañarse (bah-NYAR-seh)".',
    '',
    'When a student asks about topics outside the current unit, briefly help but redirect: "Great question!',
    'Here is a quick answer, but let us focus on our Unidad 2A1 vocabulary — have you practiced your reflexive verbs today?"',
    '',
    'Keep responses < 400 words unless generating a quiz or detailed grammar explanation.'
  ].join('\n');

  // ---- Mode-specific instructions ----
  var MODE_PROMPTS = {
    teaching: [
      'MODE: Teaching.',
      'The student is learning about Unidad 2A1 topics. Focus on reflexive verbs and daily routine vocabulary.',
      'Structure your response with: concept explanation, unit-specific examples, practice suggestion.',
      'Use vocabulary entries that have: Spanish word, English meaning, pronunciation in CAPS, and example sentence.'
    ].join('\n'),

    quizzing: [
      'MODE: Quiz.',
      'You are running an interactive quiz on Unidad 2A1 vocabulary and reflexive verbs.',
      'Present one question at a time. For multiple choice: label options as A), B), C), D).',
      'Focus questions on the 27 unit vocabulary terms and reflexive verb conjugation.',
      'After the student answers, say whether they are correct or not, explain the answer,',
      'then present the next question. Track the score.',
      'At the end, give a summary: X/Y correct with a motivational message.',
      'Use ✅ for correct, ❌ for incorrect.'
    ].join('\n'),

    correcting: [
      'MODE: Grammar Correction.',
      'The student has submitted Spanish text for correction.',
      'Focus especially on: reflexive pronoun placement, stem-changing conjugations,',
      'gender/number agreement, and accent marks.',
      'For each error: show the mistake, the correction, and a brief explanation.',
      'If the text is correct, praise the student and suggest improvements.'
    ].join('\n'),

    conversing: [
      'MODE: Daily Routine Conversation Practice.',
      'Engage the student in a conversation about their daily routine in Spanish.',
      'Use Unidad 2A1 vocabulary naturally (bañarse, despertarse, vestirse, etc.).',
      'Mix Spanish and English, ask follow-up questions about their morning routine.',
      'Gently correct any errors while keeping the conversation flowing.',
      'Example prompts: "¿A qué hora te despiertas?", "¿Qué haces primero por la mañana?"'
    ].join('\n'),

    reading: [
      'MODE: Reading Comprehension.',
      'Present a short Spanish passage about someone\'s daily routine using Unidad 2A1 vocabulary.',
      'After the passage, provide: vocabulary glossary for new words,',
      'comprehension questions (3-5) focused on reflexive verb usage.'
    ].join('\n'),

    writing: [
      'MODE: Writing Practice.',
      'Give the student a writing prompt about daily routines using reflexive verbs.',
      'Example: "Describe your morning routine from waking up to leaving for school."',
      'When they submit, focus feedback on reflexive pronoun usage and stem-changing verbs.',
      'Encourage use of all 27 unit vocabulary terms.'
    ].join('\n'),

    dialogue: [
      'MODE: Dialogue Role-Play.',
      'Role-play a morning routine scenario (e.g., a parent waking up a student, roommates sharing a bathroom).',
      'Use Unidad 2A1 vocabulary throughout. Stay in character and respond naturally.',
      'Guide the student if they get stuck by offering phrase suggestions using unit vocab.'
    ].join('\n'),

    cultural: [
      'MODE: Cultural Education.',
      'Share cultural facts related to daily life in Spanish-speaking countries.',
      'Topics: morning routines, mealtimes, personal grooming customs, school schedules.',
      'Connect cultural content to the Unidad 2A1 vocabulary and reflexive verb usage.'
    ].join('\n')
  };

  // ---- Difficulty-specific context ----
  var DIFFICULTY_CONTEXT = {
    beginner: [
      'STUDENT LEVEL: Beginner (A1-A2).',
      'Use simple vocabulary and short sentences.',
      'Explain grammar in basic terms with many examples.',
      'Focus on present tense, basic vocabulary (< 500 words), common phrases.',
      'Provide English translations for all Spanish content.',
      'Use lots of encouragement and positive reinforcement.'
    ].join('\n'),

    intermediate: [
      'STUDENT LEVEL: Intermediate (B1-B2).',
      'Use moderate vocabulary and varied sentence structures.',
      'Introduce more complex grammar: subjunctive, conditional, compound tenses.',
      'Include some longer Spanish passages without full translation.',
      'Challenge the student while maintaining confidence.',
      'Expect and encourage more Spanish output from the student.'
    ].join('\n'),

    advanced: [
      'STUDENT LEVEL: Advanced (C1-C2).',
      'Use sophisticated vocabulary, idioms, and complex structures.',
      'Discuss nuanced grammar: subjunctive triggers, regional variations, literary tenses.',
      'Respond primarily in Spanish with English only for complex grammar explanations.',
      'Include cultural and literary references.',
      'Challenge with uncommon vocabulary, slang, and register variations.'
    ].join('\n')
  };

  // ---- Message history management ----
  var MAX_HISTORY_MESSAGES = 20; // Keep last N messages for context
  var MAX_ESTIMATED_TOKENS = 3000; // Rough token budget for history

  /**
   * Estimate token count for a string (rough: ~4 chars per token).
   */
  function estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  }

  /**
   * Trim conversation history to fit within token budget.
   * Always keeps the system message; trims oldest user/assistant messages.
   * @param {Array} messages - Full messages array
   * @returns {Array} Trimmed messages
   */
  function trimHistory(messages) {
    if (!messages || messages.length <= 1) return messages;

    // System message is always first and always kept
    var system = messages[0];
    var rest = messages.slice(1);

    // Start from the end (most recent), accumulate until budget hit
    var budget = MAX_ESTIMATED_TOKENS;
    var kept = [];

    for (var i = rest.length - 1; i >= 0; i--) {
      var tokens = estimateTokens(rest[i].content);
      if (budget - tokens < 0 && kept.length >= 4) break; // Keep at least 4 recent messages
      budget -= tokens;
      kept.unshift(rest[i]);
    }

    return [system].concat(kept);
  }

  /**
   * Build the complete system prompt with context.
   * @param {Object} userState - Current user state from Conversation
   * @param {string} [mode] - Optional mode name from MODE_PROMPTS
   * @returns {string} Complete system prompt
   */
  function buildSystemPrompt(userState, mode) {
    var parts = [SYSTEM_PROMPT];

    // Add difficulty context
    var difficulty = (userState && userState.difficulty) || 'beginner';
    if (DIFFICULTY_CONTEXT[difficulty]) {
      parts.push('');
      parts.push(DIFFICULTY_CONTEXT[difficulty]);
    }

    // Add mode-specific instructions
    if (mode && MODE_PROMPTS[mode]) {
      parts.push('');
      parts.push(MODE_PROMPTS[mode]);
    }

    // Add current topic context
    if (userState && userState.currentTopic) {
      parts.push('');
      parts.push('CURRENT TOPIC: The student is currently studying "' + userState.currentTopic + '". Relate your responses to this topic when relevant.');
    }

    // Add progress context if available
    if (typeof Progress !== 'undefined') {
      try {
        var stats = Progress.getStats();
        if (stats) {
          parts.push('');
          parts.push('STUDENT PROGRESS:');
          if (stats.level) parts.push('• Level: ' + stats.level);
          if (stats.wordsLearned) parts.push('• Words learned: ' + stats.wordsLearned);
          if (stats.quizAverage) parts.push('• Quiz average: ' + stats.quizAverage + '%');
          if (stats.streak) parts.push('• Daily streak: ' + stats.streak + ' days');
          parts.push('Use this information to personalize your teaching.');
        }
      } catch (e) { /* ignore */ }
    }

    return parts.join('\n');
  }

  /**
   * Build the full messages array for an API request.
   * @param {string} userInput - The user's current message
   * @param {Array} conversationHistory - Previous {role, content} pairs
   * @param {Object} userState - Current conversation state
   * @param {string} [mode] - Optional mode
   * @param {Object} [entities] - Extracted entities for additional context
   * @returns {Array} Messages array [{role, content}, ...]
   */
  function buildMessages(userInput, conversationHistory, userState, mode, entities) {
    var messages = [];

    // 1. System prompt
    messages.push({
      role: 'system',
      content: buildSystemPrompt(userState, mode)
    });

    // 2. Add context about extracted entities if useful
    if (entities) {
      var contextParts = [];
      if (entities.wordToTranslate) {
        contextParts.push('The student wants to translate: "' + entities.wordToTranslate + '"');
      }
      if (entities.verbToConjugate) {
        contextParts.push('The student wants to conjugate: "' + entities.verbToConjugate + '"');
        if (entities.tense) contextParts.push('Tense requested: ' + entities.tense);
      }
      if (entities.grammarTopic) {
        contextParts.push('Grammar topic requested: "' + entities.grammarTopic + '"');
      }
      if (entities.category) {
        contextParts.push('Vocabulary category: "' + entities.category + '"');
      }

      if (contextParts.length > 0) {
        messages.push({
          role: 'system',
          content: 'EXTRACTED CONTEXT:\n' + contextParts.join('\n')
        });
      }
    }

    // 3. Add local knowledge data when relevant
    var knowledgeContext = buildKnowledgeContext(entities, userInput);
    if (knowledgeContext) {
      messages.push({
        role: 'system',
        content: 'REFERENCE DATA (use this to ensure accuracy):\n' + knowledgeContext
      });
    }

    // 4. Previous conversation messages
    if (conversationHistory && conversationHistory.length > 0) {
      var history = conversationHistory.slice(-MAX_HISTORY_MESSAGES);
      for (var i = 0; i < history.length; i++) {
        messages.push({
          role: history[i].role,
          content: history[i].content
        });
      }
    }

    // 5. Current user message
    messages.push({
      role: 'user',
      content: userInput
    });

    // 6. Trim to fit token budget
    return trimHistory(messages);
  }

  /**
   * Build knowledge context from local data modules when relevant.
   * This feeds structured data to the LLM for accuracy.
   */
  function buildKnowledgeContext(entities, userInput) {
    var parts = [];

    // Provide dictionary data for translation requests
    if (entities && entities.wordToTranslate && typeof Dictionary !== 'undefined') {
      var lookup = Dictionary.lookup(entities.wordToTranslate);
      if (lookup) {
        parts.push('Dictionary entry for "' + entities.wordToTranslate + '":');
        parts.push('  Spanish: ' + lookup.es + ', English: ' + lookup.en);
        if (lookup.pronunciation) parts.push('  Pronunciation: ' + lookup.pronunciation);
        if (lookup.example) parts.push('  Example: ' + lookup.example);
      }
    }

    // Provide conjugation data for verb requests
    if (entities && entities.verbToConjugate && typeof Conjugation !== 'undefined') {
      var verb = Conjugation.resolveVerb(entities.verbToConjugate);
      var tense = entities.tense || 'present';
      var result = Conjugation.conjugate(verb || entities.verbToConjugate, tense);
      if (result && result.conjugations) {
        parts.push('Conjugation of "' + result.verb + '" in ' + result.tenseName + ':');
        for (var i = 0; i < result.conjugations.length; i++) {
          var c = result.conjugations[i];
          parts.push('  ' + c.pronoun + ' → ' + c.form);
        }
        if (result.irregular) parts.push('  (Irregular verb)');
      }
    }

    // Provide grammar rule data
    if (entities && entities.grammarTopic && typeof Grammar !== 'undefined') {
      var rule = Grammar.getRule(entities.grammarTopic);
      if (rule) {
        parts.push('Grammar rule — ' + rule.title + ':');
        parts.push('  ' + rule.explanation);
      }
    }

    // Provide vocabulary category data
    if (entities && entities.category && typeof Dictionary !== 'undefined') {
      var catWords = Dictionary.getCategory(entities.category);
      if (catWords && catWords.length > 0) {
        var shown = catWords.slice(0, 10);
        parts.push('Vocabulary for "' + entities.category + '" (' + catWords.length + ' words total):');
        for (var j = 0; j < shown.length; j++) {
          parts.push('  ' + shown[j].es + ' — ' + shown[j].en + ' (' + (shown[j].pronunciation || '') + ')');
        }
      }
    }

    return parts.length > 0 ? parts.join('\n') : null;
  }

  /**
   * Get available modes.
   */
  function getModes() {
    var modes = [];
    for (var key in MODE_PROMPTS) {
      if (MODE_PROMPTS.hasOwnProperty(key)) modes.push(key);
    }
    return modes;
  }

  return {
    buildSystemPrompt: buildSystemPrompt,
    buildMessages: buildMessages,
    buildKnowledgeContext: buildKnowledgeContext,
    getModes: getModes,
    estimateTokens: estimateTokens,
    trimHistory: trimHistory
  };
})();
