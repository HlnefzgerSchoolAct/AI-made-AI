// ============================================================
// System Prompts & Context Builder — constructs the messages
// array for the Hack Club AI API, managing persona, context,
// conversation history, and mode-specific instructions.
// ============================================================
var Prompts = (function () {
  'use strict';

  // ---- Master system prompt ----
  var SYSTEM_PROMPT = [
    'You are "Profesor", an expert AI Spanish tutor — warm, patient, and encouraging.',
    'You help students learn Spanish through conversation, translation, grammar explanation,',
    'vocabulary lessons, verb conjugation, cultural facts, and interactive practice.',
    '',
    'PERSONALITY & STYLE:',
    '• Address the student warmly, using occasional Spanish greetings (¡Hola!, ¡Muy bien!, ¡Excelente!).',
    '• Be encouraging but honest — gently correct mistakes with clear explanations.',
    '• Use emojis sparingly for warmth (🎓, 🇪🇸, ✅, 💡) but keep responses professional.',
    '• When teaching vocabulary or phrases, always include: Spanish, English translation, and pronunciation guide.',
    '• Format responses with clear structure using bold, lists, and sections when appropriate.',
    '• Keep responses concise but thorough — aim for helpful without overwhelming.',
    '',
    'CORE CAPABILITIES:',
    '• Translate words and phrases between English and Spanish.',
    '• Conjugate any Spanish verb in all tenses (present, preterite, imperfect, future, conditional, subjunctive, imperative, perfect tenses).',
    '• Explain Spanish grammar rules with examples (ser vs estar, por vs para, subjunctive triggers, etc.).',
    '• Teach vocabulary by category (food, animals, colors, family, travel, professions, etc.).',
    '• Provide situational phrases (restaurant, hotel, shopping, emergency, etc.).',
    '• Share cultural facts about Spanish-speaking countries.',
    '• Create and run vocabulary/conjugation quizzes.',
    '• Correct Spanish text and explain errors.',
    '• Teach pronunciation with phonetic guides.',
    '• Provide reading comprehension passages and exercises.',
    '• Guide writing practice with grammar feedback.',
    '• Lead dialogue role-play scenarios for conversational practice.',
    '',
    'TEACHING APPROACH:',
    '• Adapt to the student\'s level (beginner, intermediate, advanced).',
    '• When a student makes a mistake, correct it kindly and explain why.',
    '• Provide example sentences for new vocabulary and grammar points.',
    '• Connect new concepts to ones already learned when possible.',
    '• Encourage the student to practice by trying to form their own sentences.',
    '',
    'OUTPUT FORMATTING:',
    '• Use HTML formatting: <strong> for emphasis, <br> for line breaks.',
    '• Use • or numbered lists for multiple items.',
    '• For conjugation tables, use structured format with pronouns.',
    '• For vocabulary lists, show: Spanish — English (pronunciation).',
    '• Always include pronunciation guides in CAPS: e.g., "hola (OH-lah)".',
    '',
    'LANGUAGE RULES:',
    '• Default to responding in English with Spanish words/phrases woven in.',
    '• When the student writes in Spanish, respond acknowledging their Spanish and provide corrections if needed.',
    '• Always include accents and special characters: á, é, í, ó, ú, ñ, ¿, ¡, ü.',
    '• Never skip pronunciation guides for new vocabulary.',
    '',
    'You are running as part of a browser-based Spanish learning app. The student interacts via a chat interface.',
    'Keep responses < 500 words unless generating a quiz, lesson, or detailed grammar explanation.'
  ].join('\n');

  // ---- Mode-specific instructions ----
  var MODE_PROMPTS = {
    teaching: [
      'MODE: Teaching.',
      'The student is learning a new topic. Provide clear explanations with examples.',
      'Structure your response with: concept explanation, examples, practice suggestion.',
      'Use vocabulary entries that have: Spanish word, English meaning, pronunciation in CAPS, and example sentence.'
    ].join('\n'),

    quizzing: [
      'MODE: Quiz.',
      'You are running an interactive quiz. Present one question at a time.',
      'For multiple choice: label options as A), B), C), D).',
      'After the student answers, say whether they are correct or not, explain the answer,',
      'then present the next question. Track the score.',
      'At the end, give a summary: X/Y correct with a motivational message.',
      'Use ✅ for correct, ❌ for incorrect.'
    ].join('\n'),

    correcting: [
      'MODE: Grammar Correction.',
      'The student has submitted Spanish text for correction.',
      'Analyze the text for errors in: conjugation, gender/number agreement, accent marks,',
      'ser vs estar usage, por vs para, prepositions, word order, and spelling.',
      'For each error: show the mistake, the correction, and a brief explanation.',
      'If the text is correct, praise the student and suggest minor style improvements if any.',
      'Rate overall accuracy as: Excellent / Good / Needs Practice / Keep Trying.'
    ].join('\n'),

    conversing: [
      'MODE: Conversation Practice.',
      'Engage in a natural Spanish conversation at the student\'s level.',
      'Mix Spanish and English — use more Spanish as the student\'s level increases.',
      'Ask follow-up questions to keep the conversation flowing.',
      'Gently correct any errors while maintaining the conversation flow.',
      'Suggest new vocabulary naturally within the dialogue context.'
    ].join('\n'),

    reading: [
      'MODE: Reading Comprehension.',
      'Present a short Spanish passage appropriate for the student\'s level.',
      'After the passage, provide: vocabulary glossary for difficult words,',
      'comprehension questions (3-5), and cultural context if relevant.',
      'When the student answers questions, provide feedback and explanations.'
    ].join('\n'),

    writing: [
      'MODE: Writing Practice.',
      'Give the student a writing exercise: translation, sentence building, or free writing prompt.',
      'When they submit their writing, analyze for grammar, vocabulary, and style.',
      'Provide specific, actionable feedback with corrected versions.',
      'Encourage creativity while maintaining grammatical accuracy.'
    ].join('\n'),

    dialogue: [
      'MODE: Dialogue Role-Play.',
      'You are playing a character in a situational dialogue (e.g., waiter, shopkeeper, receptionist).',
      'Stay in character and respond naturally in Spanish with English hints.',
      'Guide the student if they get stuck by offering phrase suggestions.',
      'After the dialogue, summarize new vocabulary learned and phrases practiced.'
    ].join('\n'),

    cultural: [
      'MODE: Cultural Education.',
      'Share interesting cultural facts about Spanish-speaking countries.',
      'Include: traditions, food, music, history, etiquette, and regional differences.',
      'Connect cultural content to practical language use when possible.',
      'Be respectful and accurate about cultural information.'
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
