// ============================================================
// Response Engine — generates professor-style responses
// per intent, filling templates with data from the Spanish
// language engine modules
// ============================================================
var Responses = (function () {
  'use strict';

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ---- Static response pools per intent ----
  var static_responses = {
    greeting: [
      '¡Hola! Welcome to 3rd Hour Spanish! 🇪🇸 Ready to practice your Unidad 2A1 vocabulary?',
      '¡Buenos días! Great to see you! Let\'s work on your daily routine vocabulary and reflexive verbs! 🇪🇸',
      '¡Bienvenido a 3rd Hour Spanish! Want to quiz on Unidad 2A1, practice reflexive verbs, or review flashcards?',
      '¡Hola, estudiante! Welcome to 3rd Hour Spanish! We\'re focused on Unidad 2A1 — la rutina diaria. ¿Qué te gustaría practicar?'
    ],

    farewell: [
      '¡Adiós! Keep practicing your Spanish. ¡Hasta la próxima! (Until next time!)',
      '¡Hasta luego! You\'re making great progress. Come back anytime to practice! 🎓',
      '¡Buena suerte! (Good luck!) Remember: a little practice every day goes a long way. ¡Nos vemos!',
      '¡Chao! It was a pleasure teaching you. ¡Hasta pronto! (See you soon!) 👋'
    ],

    about_self: [
      'I\'m your <strong>3rd Hour Spanish</strong> study assistant! 🇪🇸 I\'m focused on helping you master <strong>Unidad 2A1 — La rutina diaria</strong> from ¡Qué Chévere! Level 2. I can:\n\n• <strong>Quiz</strong> you on all 27 Unidad 2A1 vocabulary words\n• <strong>Explain reflexive verbs</strong> and stem changes (despertarse, vestirse)\n• <strong>Practice conversations</strong> about daily routines\n• <strong>Conjugate</strong> reflexive verbs with pronoun placement\n• <strong>Flashcard review</strong> with spaced repetition\n• Track your <strong>progress</strong>\n\n¡Vamos a estudiar! 🇪🇸',
      'I\'m the study tool for <strong>3rd Hour Spanish</strong>! 🇪🇸 Right now we\'re working on Unidad 2A1 — daily routines, reflexive verbs, and bathroom vocabulary from ¡Qué Chévere! Level 2. I can quiz you, explain grammar, practice conversations, and track your progress.\n\n¿En qué puedo ayudarte? (How can I help you?)'
    ],

    help: [
      'Here\'s what I can help you with for <strong>Unidad 2A1</strong>! 🇪🇸\n\n<div class="help-grid"><div class="help-item">🧠 <strong>"Quiz me"</strong> — Quiz on Unidad 2A1 vocab</div><div class="help-item">📋 <strong>"Vocab list"</strong> — See all 27 unit words</div><div class="help-item">📝 <strong>"Reflexive verbs"</strong> — Grammar explanation</div><div class="help-item">💬 <strong>"Practice conversation"</strong> — Daily routine dialogue</div><div class="help-item">🃏 <strong>"Flashcards"</strong> — Spaced repetition review</div><div class="help-item">🔤 <strong>"How do you say comb in Spanish?"</strong> — Translate words</div><div class="help-item">📖 <strong>"Conjugate vestirse"</strong> — Reflexive conjugation</div><div class="help-item">🔊 <strong>"How to pronounce cepillarse"</strong> — Pronunciation help</div><div class="help-item">✏️ <strong>"Is this correct: me despierto a las siete"</strong> — Check your Spanish</div><div class="help-item">📚 <strong>"Learning path"</strong> — See your lesson progress</div></div>\n\nUse the quick buttons below the chat, or browse topics in the sidebar! ¿Qué quieres practicar?'
    ],

    thanks: [
      '¡De nada! (You\'re welcome!) Happy to help. Keep up the great work! 🌟',
      '¡Con mucho gusto! (With pleasure!) That\'s what I\'m here for. Keep practicing! 🎓',
      '¡No hay de qué! (Don\'t mention it!) Helping you learn Spanish is my favorite thing to do! 😊',
      '¡De nada, estudiante! You\'re doing great. What would you like to learn next?'
    ],

    positive: [
      '¡Excelente! Let\'s keep going! What would you like to do next? 🎯',
      '¡Perfecto! ¿Qué más te gustaría aprender? (What else would you like to learn?)',
      '¡Muy bien! I love your enthusiasm! What\'s next? 🌟'
    ],

    negative: [
      'No problem! Take your time. Whenever you\'re ready, just ask me anything about Spanish. 😊',
      "¡Está bien! (That's okay!) I'll be here whenever you want to continue. 🎓",
      'No worries! Learning at your own pace is important. I\'m here when you need me!'
    ],

    alphabet: [
      'The Spanish alphabet has <strong>27 letters</strong> — the same 26 as English, plus <strong>ñ</strong> (eñe)! 🔤\n\n<div class="grammar-explanation"><div class="grammar-section"><div class="grammar-heading">Special Letters & Sounds:</div><ul><li><strong>Ñ / ñ</strong> (eñe) — sounds like "ny" in "canyon": <span class="spanish-text">España, niño, año</span></li><li><strong>LL</strong> — sounds like "y" in most dialects: <span class="spanish-text">llamar, calle, pollo</span></li><li><strong>RR</strong> — rolled/trilled R: <span class="spanish-text">perro, carro, arroz</span></li><li><strong>H</strong> — always silent: <span class="spanish-text">hola, hacer, hotel</span></li><li><strong>J</strong> — sounds like English "h": <span class="spanish-text">jugar, joven, rojo</span></li><li><strong>Z</strong> — sounds like "s" in Latin America, "th" in Spain: <span class="spanish-text">zapato, azul</span></li></ul></div><div class="grammar-section"><div class="grammar-heading">Accent Marks (tildes):</div><ul><li><strong>á, é, í, ó, ú</strong> — indicate stressed syllable: <span class="spanish-text">café, rápido, teléfono</span></li><li><strong>ü</strong> — in güe/güi, the U is pronounced: <span class="spanish-text">pingüino, bilingüe</span></li><li><strong>¿ ¡</strong> — opening question/exclamation marks (unique to Spanish!)</li></ul></div></div>'
    ]
  };

  // ---- Dynamic response generators per intent ----

  function generateTranslateToSpanish(entities, text) {
    var word = entities.wordToTranslate;
    if (!word) {
      // Try to extract from raw text
      var words = Tokenizer.tokenize(text);
      // Find the most likely word to translate
      var skipWords = ['how','do','i','you','we','say','in','spanish','what','is','translate','to','the','a','word','for','me','tell','of'];
      for (var i = words.length - 1; i >= 0; i--) {
        if (skipWords.indexOf(words[i]) === -1) {
          word = words[i];
          break;
        }
      }
    }
    if (!word) {
      return 'What word would you like me to translate to Spanish? Just say something like "How do you say dog in Spanish?" 🔤';
    }

    // Check if it's a multi-word phrase
    var isPhrase = word.indexOf(' ') !== -1;

    var entry = Dictionary.lookupEnglish(word);
    if (!entry) {
      // Try search
      var results = Dictionary.search(word);
      if (results.length > 0) {
        entry = results[0];
      }
    }

    if (entry) {
      var response = pick([
        '"' + entry.en.charAt(0).toUpperCase() + entry.en.slice(1) + '" in Spanish is <strong class="spanish-text">' + entry.es + '</strong>',
        'The Spanish word for "' + entry.en + '" is <strong class="spanish-text">' + entry.es + '</strong>',
        '¡Buena pregunta! "' + entry.en.charAt(0).toUpperCase() + entry.en.slice(1) + '" = <strong class="spanish-text">' + entry.es + '</strong>'
      ]);
      if (entry.pronunciation) {
        response += ' (🔊 ' + entry.pronunciation + ')';
      }
      if (entry.example) {
        response += '\n\n<em>Example: <span class="spanish-text">' + entry.example + '</span></em>';
      }
      response += '\n\n💡 <em>Category: ' + entry.category + '</em>';
      return response;
    }

    // For multi-word phrases, try to translate individual key words
    if (isPhrase) {
      var phraseWords = word.toLowerCase().split(/\s+/);
      var stopWords = ['i','me','my','you','your','he','she','it','we','they','the','a','an','is','am','are','was','were','do','did','to','in','on','at','of','and','or','but','not','with','for','that','this','have','has','had'];
      var translated = [];
      for (var i = 0; i < phraseWords.length; i++) {
        var pw = phraseWords[i];
        var pwEntry = Dictionary.lookupEnglish(pw);
        if (!pwEntry) {
          var pwResults = Dictionary.search(pw);
          if (pwResults.length > 0) pwEntry = pwResults[0];
        }
        if (pwEntry) {
          translated.push({ en: pw, es: pwEntry.es, pronunciation: pwEntry.pronunciation });
        }
      }

      if (translated.length > 0) {
        var response = 'I can\'t translate the full phrase <em>"' + word + '"</em> directly, but here are the key words I know:\n\n';
        response += '<div class="vocab-list">';
        for (var i = 0; i < translated.length; i++) {
          response += '<div class="vocab-item">';
          response += '<span class="vocab-english">' + translated[i].en + '</span>';
          response += ' → <span class="spanish-text vocab-spanish">' + translated[i].es + '</span>';
          if (translated[i].pronunciation) {
            response += ' <span class="vocab-pronunciation">(🔊 ' + translated[i].pronunciation + ')</span>';
          }
          response += '</div>';
        }
        response += '</div>';
        response += '\n\n💡 <em>Tip: Try asking about individual words, or check out our grammar lessons for sentence structure!</em>';
        return response;
      }
    }

    return 'Hmm, I don\'t have "' + word + '" in my dictionary yet. Try asking about common words — I know 500+ words across categories like food, colors, animals, family, and more! 📚';
  }

  function generateTranslateToEnglish(entities, text) {
    var word = entities.wordToTranslate || entities.spanishText;
    if (!word) {
      var words = Tokenizer.tokenize(text);
      var skipWords = ['what','does','mean','in','english','translate','to','the','meaning','of','this','is'];
      for (var i = words.length - 1; i >= 0; i--) {
        if (skipWords.indexOf(words[i]) === -1) {
          word = words[i];
          break;
        }
      }
    }
    if (!word) {
      return 'What Spanish word would you like me to translate to English? 🔤';
    }

    var entry = Dictionary.lookupSpanish(word);
    if (!entry) {
      entry = Dictionary.lookupEnglish(word);
    }
    if (!entry) {
      var results = Dictionary.search(word);
      if (results.length > 0) entry = results[0];
    }

    if (entry) {
      var response = '<span class="spanish-text">"' + entry.es + '"</span> means <strong>"' + entry.en + '"</strong> in English.';
      if (entry.pronunciation) {
        response += ' (🔊 ' + entry.pronunciation + ')';
      }
      if (entry.example) {
        response += '\n\n<em>Example: <span class="spanish-text">' + entry.example + '</span></em>';
      }
      return response;
    }

    return 'I couldn\'t find that word in my dictionary. Try a common Spanish word! I know vocabulary for food, colors, animals, family, body parts, and many more categories.';
  }

  function generateConjugation(entities) {
    var verb = entities.verbToConjugate;
    var tense = entities.tense || 'present';
    if (!verb) {
      return 'Which verb would you like me to conjugate? Try saying: <em>"Conjugate hablar in present tense"</em> or <em>"Conjugate ser"</em> 📖';
    }

    if (!Conjugation.isKnownVerb(verb)) {
      return 'I\'m not sure I recognize the verb "' + verb + '". Make sure it\'s in its infinitive form (ending in -ar, -er, or -ir). For example: <span class="spanish-text">hablar, comer, vivir</span>.';
    }

    var result = Conjugation.conjugate(verb, tense);
    if (!result) {
      return 'I had trouble conjugating "' + verb + '". Try a different verb or tense!';
    }

    var intro = pick([
      '¡Vamos a ver! Here\'s the conjugation of <strong class="spanish-text">' + result.verb + '</strong>:',
      'Here is <strong class="spanish-text">' + result.verb + '</strong> in the ' + result.tenseName + ':',
      '¡Claro que sí! Let me show you <strong class="spanish-text">' + result.verb + '</strong>:'
    ]);

    return intro + '\n\n' + Conjugation.formatTable(result) +
      '\n\n💡 <em>Want another tense? Try: "Conjugate ' + result.verb + ' in preterite/future/subjunctive"</em>';
  }

  function generateGrammarExplanation(entities) {
    var topic = entities.grammarTopic;
    if (!topic) {
      var topics = Grammar.getTopics();
      return 'I can explain many grammar topics! Here are some:\n\n' +
        topics.map(function(t) { return '• <strong>' + t + '</strong>'; }).join('\n') +
        '\n\nJust ask: <em>"Explain ser vs estar"</em> or <em>"Tell me about the subjunctive"</em>';
    }

    var rule = Grammar.getRule(topic);
    if (!rule) {
      return 'I don\'t have a detailed explanation for "' + topic + '" yet. Try one of these topics: ' +
        Grammar.getTopics().join(', ') + '.';
    }

    var intro = pick([
      '¡Excelente pregunta! Let me explain this important topic:',
      'Great question! This is a key concept in Spanish:',
      '¡Vamos a aprender! Here\'s what you need to know:'
    ]);

    return intro + '\n\n' + Grammar.formatRule(rule);
  }

  function generateVocabularyLesson(entities) {
    var category = entities.category;
    if (!category) {
      var cats = Dictionary.getCategories();
      return 'I have vocabulary organized by category! Choose one:\n\n' +
        cats.map(function(c) { return '• <strong>' + c.charAt(0).toUpperCase() + c.slice(1) + '</strong>'; }).join('\n') +
        '\n\nSay something like <em>"Teach me food vocabulary"</em> or <em>"Show me animal words"</em> 📋';
    }

    var words = Dictionary.getCategory(category);
    if (!words) {
      return 'I don\'t have a vocabulary list for "' + category + '" yet. Try: ' +
        Dictionary.getCategories().join(', ');
    }

    // Show 8 random words from the category
    var sample = [];
    var indices = {};
    var count = Math.min(8, words.length);
    while (sample.length < count) {
      var idx = Math.floor(Math.random() * words.length);
      if (!indices[idx]) {
        indices[idx] = true;
        sample.push(words[idx]);
      }
    }

    var intro = pick([
      '¡Vamos a aprender! Here are some <strong>' + category + '</strong> words:',
      'Let\'s learn some <strong>' + category + '</strong> vocabulary! 📚',
      '¡Excelente elección! Here\'s some <strong>' + category + '</strong> vocab:'
    ]);

    var html = '<div class="vocab-list">';
    for (var i = 0; i < sample.length; i++) {
      var w = sample[i];
      html += '<div class="vocab-item">';
      html += '<span class="vocab-english">' + w.en + '</span>';
      html += ' → <span class="spanish-text vocab-spanish">' + w.es + '</span>';
      if (w.pronunciation) {
        html += ' <span class="vocab-pronunciation">(🔊 ' + w.pronunciation + ')</span>';
      }
      html += '</div>';
    }
    html += '</div>';

    return intro + '\n\n' + html +
      '\n\n💡 Say <strong>"more"</strong> for more words, or <strong>"quiz me on ' + category + '"</strong> to test yourself!';
  }

  function generatePhraseResponse(entities, text) {
    var situation = null;
    var lower = text.toLowerCase();

    // Try to find situational keyword
    var situations = Phrases.getSituations();
    for (var i = 0; i < situations.length; i++) {
      if (lower.indexOf(situations[i]) !== -1) {
        situation = situations[i];
        break;
      }
    }
    // Also check for common keywords
    if (!situation) {
      var keywordMap = {
        'restaurant': 'restaurant', 'food': 'restaurant', 'eat': 'restaurant', 'order': 'restaurant', 'menu': 'restaurant',
        'shop': 'shopping', 'buy': 'shopping', 'store': 'shopping', 'price': 'shopping',
        'direction': 'directions', 'lost': 'directions', 'where': 'directions', 'navigate': 'directions',
        'hotel': 'hotel', 'room': 'hotel', 'reservation': 'hotel', 'check in': 'hotel',
        'emergency': 'emergency', 'help': 'emergency', 'doctor': 'emergency', 'police': 'emergency', 'hospital': 'emergency',
        'weather': 'weather', 'rain': 'weather', 'hot': 'weather', 'cold': 'weather', 'sunny': 'weather',
        'phone': 'phone', 'call': 'phone', 'telephone': 'phone',
        'travel': 'travel', 'airport': 'travel', 'bus': 'travel', 'train': 'travel', 'flight': 'travel', 'ticket': 'travel',
        'greet': 'greetings', 'introduce': 'greetings', 'introduction': 'greetings', 'meet': 'greetings',
        'talk': 'smalltalk', 'opinion': 'smalltalk', 'conversation': 'smalltalk', 'chat': 'smalltalk'
      };
      var words = lower.split(/\s+/);
      for (var i = 0; i < words.length; i++) {
        if (keywordMap[words[i]]) {
          situation = keywordMap[words[i]];
          break;
        }
      }
    }

    if (situation) {
      var data = Phrases.getSituation(situation);
      if (data) {
        var intro = pick([
          '¡Perfecto! Here are some useful phrases:',
          'These will come in handy! 💬',
          '¡Vamos a practicar! Here are key phrases for this situation:'
        ]);
        return intro + '\n\n' + Phrases.formatPhrases(data, 5) +
          '\n\n💡 Say <strong>"more"</strong> to see additional phrases!';
      }
    }

    // No specific situation matched
    return 'I have phrases for many situations! Choose one:\n\n' +
      Phrases.getSituations().map(function(s) {
        var d = Phrases.data[s];
        return '• <strong>' + d.title + '</strong>';
      }).join('\n') +
      '\n\nJust say something like <em>"Restaurant phrases"</em> or <em>"How to ask for directions"</em> 💬';
  }

  function generatePronunciation(entities, text) {
    var word = entities.wordToTranslate;
    if (!word) {
      var words = Tokenizer.tokenize(text);
      var skipWords = ['how','to','pronounce','pronunciation','of','do','you','say','the','word','is','it','in','spanish'];
      for (var i = words.length - 1; i >= 0; i--) {
        if (skipWords.indexOf(words[i]) === -1) {
          word = words[i];
          break;
        }
      }
    }

    if (word) {
      var entry = Dictionary.lookup(word);
      if (entry && entry.pronunciation) {
        return '<strong class="spanish-text">' + entry.es + '</strong> is pronounced: <strong>🔊 ' + entry.pronunciation + '</strong>\n\n' +
          (entry.en ? 'English: "' + entry.en + '"' : '') +
          (entry.example ? '\n<em>Example: <span class="spanish-text">' + entry.example + '</span></em>' : '') +
          '\n\n💡 <em>Tip: Stress the syllable in CAPS!</em>';
      }
    }

    return 'Here are some key Spanish pronunciation rules:\n\n' +
      '<div class="grammar-explanation">' +
      '<ul>' +
      '<li><strong>Vowels</strong> are always pronounced the same: A (ah), E (eh), I (ee), O (oh), U (oo)</li>' +
      '<li><strong>H</strong> is always silent: <span class="spanish-text">hola</span> = OH-lah</li>' +
      '<li><strong>J</strong> sounds like English H: <span class="spanish-text">jugar</span> = hoo-GAR</li>' +
      '<li><strong>LL</strong> sounds like Y: <span class="spanish-text">llamar</span> = yah-MAR</li>' +
      '<li><strong>Ñ</strong> sounds like NY: <span class="spanish-text">año</span> = AH-nyoh</li>' +
      '<li><strong>RR</strong> is rolled/trilled: <span class="spanish-text">perro</span> = PEH-rroh</li>' +
      '<li><strong>Accent marks</strong> show stressed syllable: <span class="spanish-text">café</span> = kah-FEH</li>' +
      '</ul></div>' +
      '\n\nAsk me about a specific word: <em>"How to pronounce perro"</em>';
  }

  function generateCulturalInfo() {
    var facts = [
      '🌎 <strong>Spanish is the world\'s 4th most spoken language</strong> with over 500 million speakers! It\'s the official language in 20 countries across 4 continents.\n\nCountries include: Spain, Mexico, Colombia, Argentina, Peru, Venezuela, Chile, Ecuador, Guatemala, Cuba, Dominican Republic, Honduras, Paraguay, El Salvador, Nicaragua, Costa Rica, Panama, Uruguay, Puerto Rico, and Equatorial Guinea.',

      '🇪🇸 <strong>Spain vs. Latin America — Key Differences:</strong>\n\n<div class="grammar-explanation"><ul><li><strong>Vosotros</strong> — Used only in Spain for "you all" (informal). Latin America uses <span class="spanish-text">ustedes</span> for both formal and informal.</li><li><strong>Pronunciation</strong> — In Spain, "z" and "ci/ce" are pronounced like "th" (called <em>distinción</em>). In Latin America, they sound like "s".</li><li><strong>Vocabulary</strong> — Car: <span class="spanish-text">coche</span> (Spain), <span class="spanish-text">carro</span> (most of LatAm), <span class="spanish-text">auto</span> (Argentina)</li><li><strong>Computer</strong>: <span class="spanish-text">ordenador</span> (Spain) vs. <span class="spanish-text">computadora</span> (LatAm)</li></ul></div>',

      '📚 <strong>Fun facts about Spanish:</strong>\n\n<div class="grammar-explanation"><ul><li>Spanish evolved from <strong>Vulgar Latin</strong> and was heavily influenced by Arabic during the 800-year Moorish presence in Spain</li><li>The ¿ and ¡ marks are unique to Spanish — they help readers know a question/exclamation is coming!</li><li>The <strong>Royal Spanish Academy</strong> (RAE) oversees the language and publishes the official dictionary</li><li>The longest Spanish word in the dictionary is <span class="spanish-text"><strong>electroencefalografista</strong></span> (electroencephalograph technician) — 23 letters!</li><li>Spanish is one of the most <strong>phonetically consistent</strong> languages — words are almost always pronounced as they\'re spelled</li></ul></div>',

      '🎭 <strong>Spanish Language Traditions & Culture:</strong>\n\n<div class="grammar-explanation"><ul><li><strong>Siesta</strong> — The midday rest tradition, still observed in parts of Spain</li><li><strong>Sobremesa</strong> — The art of lingering at the table after a meal to chat. There\'s no English equivalent!</li><li><strong>Two last names</strong> — Spanish speakers traditionally use both father\'s and mother\'s surnames: Gabriel García Márquez</li><li><strong>Día de los Muertos</strong> — Day of the Dead (Mexico), a celebration honoring deceased family members</li><li><strong>La Tomatina</strong> — Spain\'s famous tomato-throwing festival held in Buñol</li></ul></div>'
    ];
    return pick(facts);
  }

  function generateWordOfDay() {
    var entry = Dictionary.getWordOfTheDay();
    var html = '<div class="word-of-day">';
    html += '<div class="wod-label">🌟 Word of the Day</div>';
    html += '<div class="wod-spanish">' + entry.es + '</div>';
    html += '<div class="wod-english">' + entry.en + '</div>';
    if (entry.pronunciation) {
      html += '<div class="wod-pronunciation">🔊 ' + entry.pronunciation + '</div>';
    }
    if (entry.example) {
      html += '<div class="wod-example"><em>' + entry.example + '</em></div>';
    }
    html += '<div class="wod-category">Category: ' + (entry.category || 'general') + '</div>';
    html += '</div>';
    return '¡Buenos días, estudiante! Here\'s today\'s word:\n\n' + html +
      '\n\nTry using it in a sentence! Or ask me for a quiz to test your vocabulary. 🎯';
  }

  function generateDifficultyChange(text) {
    var lower = text.toLowerCase();
    var level = null;
    if (lower.indexOf('beginner') !== -1 || lower.indexOf('easy') !== -1 || lower.indexOf('easier') !== -1 || lower.indexOf('simpler') !== -1) {
      level = 'beginner';
    } else if (lower.indexOf('intermediate') !== -1) {
      level = 'intermediate';
    } else if (lower.indexOf('advanced') !== -1 || lower.indexOf('hard') !== -1 || lower.indexOf('harder') !== -1) {
      level = 'advanced';
    }

    if (level) {
      return { level: level };
    }
    return { level: null };
  }

  function generateCountingLesson() {
    var html = '¡Vamos a contar! Let\'s count in Spanish! 🔢\n\n';
    html += '<div class="vocab-list">';
    var nums = Dictionary.getCategory('numbers');
    if (nums) {
      var basic = nums.slice(0, 15); // 0-15 (first 15 entries)
      for (var i = 0; i < basic.length; i++) {
        html += '<div class="vocab-item">';
        html += '<span class="vocab-english">' + basic[i].en + '</span>';
        html += ' → <span class="spanish-text vocab-spanish">' + basic[i].es + '</span>';
        html += ' <span class="vocab-pronunciation">(🔊 ' + basic[i].pronunciation + ')</span>';
        html += '</div>';
      }
    }
    html += '</div>';
    html += '\n\n💡 <em>Want to learn higher numbers? Say "teach me numbers" for the full list!</em>';
    return html;
  }

  function generateTimeDateLesson(text) {
    var lower = text.toLowerCase();
    if (lower.indexOf('days') !== -1 || lower.indexOf('week') !== -1) {
      var days = Dictionary.getCategory('time');
      if (!days) return 'Sorry, I had trouble loading the days vocabulary.';
      var dayEntries = days.filter(function(d) {
        return ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].indexOf(d.en) !== -1;
      });
      var html = '📅 <strong>Days of the Week in Spanish:</strong>\n\n<div class="vocab-list">';
      for (var i = 0; i < dayEntries.length; i++) {
        html += '<div class="vocab-item">';
        html += '<span class="vocab-english">' + dayEntries[i].en + '</span>';
        html += ' → <span class="spanish-text vocab-spanish">' + dayEntries[i].es + '</span>';
        html += ' <span class="vocab-pronunciation">(🔊 ' + dayEntries[i].pronunciation + ')</span>';
        html += '</div>';
      }
      html += '</div>';
      html += '\n\n💡 <em>Note: In Spanish, days of the week are NOT capitalized! Also, the week starts on Monday (lunes).</em>';
      return html;
    }

    if (lower.indexOf('month') !== -1) {
      var months = Dictionary.getCategory('time');
      if (!months) return 'Sorry, I had trouble loading the months vocabulary.';
      var monthEntries = months.filter(function(m) {
        return ['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(m.en) !== -1;
      });
      var html = '📅 <strong>Months of the Year in Spanish:</strong>\n\n<div class="vocab-list">';
      for (var i = 0; i < monthEntries.length; i++) {
        html += '<div class="vocab-item">';
        html += '<span class="vocab-english">' + monthEntries[i].en + '</span>';
        html += ' → <span class="spanish-text vocab-spanish">' + monthEntries[i].es + '</span>';
        html += ' <span class="vocab-pronunciation">(🔊 ' + monthEntries[i].pronunciation + ')</span>';
        html += '</div>';
      }
      html += '</div>';
      html += '\n\n💡 <em>Just like days, months are NOT capitalized in Spanish!</em>';
      return html;
    }

    // General time telling
    return '⏰ <strong>Telling Time in Spanish:</strong>\n\n<div class="grammar-explanation"><ul>' +
      '<li><strong>¿Qué hora es?</strong> — What time is it?</li>' +
      '<li><strong>Es la una.</strong> — It\'s 1:00. (Use "es" for 1 o\'clock only)</li>' +
      '<li><strong>Son las dos.</strong> — It\'s 2:00. (Use "son" for 2-12)</li>' +
      '<li><strong>Son las tres y media.</strong> — It\'s 3:30. (y media = and a half)</li>' +
      '<li><strong>Son las cinco y cuarto.</strong> — It\'s 5:15. (y cuarto = and a quarter)</li>' +
      '<li><strong>Son las ocho menos diez.</strong> — It\'s 7:50. (menos = minus/to)</li>' +
      '<li><strong>de la mañana</strong> = AM, <strong>de la tarde</strong> = PM (afternoon), <strong>de la noche</strong> = PM (evening)</li>' +
      '</ul></div>';
  }

  function generateLessonSuggestion() {
    var topics = [
      { name: 'Unidad 2A1 Vocabulary', desc: 'Learn all 27 daily routine and bathroom words' },
      { name: 'Reflexive Verbs', desc: 'Master reflexive pronouns and conjugation' },
      { name: 'Stem-Changing Reflexives', desc: 'Practice despertarse (e→ie) and vestirse (e→i)' },
      { name: 'Daily Routine Practice', desc: 'Describe your morning routine in Spanish' },
      { name: 'Bathroom Vocabulary', desc: 'Learn el jabón, la toalla, el espejo, and more' },
      { name: 'Pronoun Placement', desc: 'Where do reflexive pronouns go? Before verb vs attached' },
      { name: 'Vocabulary Quiz', desc: 'Test yourself on Unidad 2A1 words' },
      { name: 'Flashcard Review', desc: 'Spaced repetition review of your vocab cards' }
    ];

    var html = '📚 <strong>Unidad 2A1 — La rutina diaria:</strong>\n\n<div class="lesson-list">';
    for (var i = 0; i < topics.length; i++) {
      html += '<div class="lesson-item">';
      html += '<strong>' + (i + 1) + '. ' + topics[i].name + '</strong>';
      html += '<br><em>' + topics[i].desc + '</em>';
      html += '</div>';
    }
    html += '</div>';
    html += '\n\nJust ask about any of these! For example: <em>"Teach me reflexive verbs"</em> or <em>"Quiz me on 2A1"</em>';
    return html;
  }

  function generatePracticeConversation() {
    var dialogues = [
      {
        title: 'La rutina de la mañana (Morning Routine)',
        lines: [
          { speaker: '🧑', es: '¿A qué hora te despiertas?', en: 'What time do you wake up?' },
          { speaker: '👩', es: 'Me despierto a las siete.', en: 'I wake up at seven.' },
          { speaker: '🧑', es: '¿Qué haces después?', en: 'What do you do after?' },
          { speaker: '👩', es: 'Me ducho y me lavo el pelo con champú.', en: 'I shower and wash my hair with shampoo.' },
          { speaker: '🧑', es: '¿Y luego?', en: 'And then?' },
          { speaker: '👩', es: 'Me cepillo los dientes, me peino y me visto.', en: 'I brush my teeth, comb my hair, and get dressed.' }
        ]
      },
      {
        title: 'En el baño (In the Bathroom)',
        lines: [
          { speaker: '🧑', es: '¿Dónde está el jabón?', en: 'Where is the soap?' },
          { speaker: '👩', es: 'Está al lado del lavabo.', en: 'It\'s next to the sink.' },
          { speaker: '🧑', es: '¿Y la toalla?', en: 'And the towel?' },
          { speaker: '👩', es: 'Hay una toalla limpia en la ducha.', en: 'There\'s a clean towel in the shower.' },
          { speaker: '🧑', es: 'Necesito el peine también.', en: 'I need the comb too.' },
          { speaker: '👩', es: 'El peine está delante del espejo.', en: 'The comb is in front of the mirror.' }
        ]
      },
      {
        title: 'Describiendo tu rutina (Describing Your Routine)',
        lines: [
          { speaker: '🧑', es: '¿Cómo es tu rutina diaria?', en: 'What is your daily routine like?' },
          { speaker: '👩', es: 'Primero me levanto y me baño en la tina.', en: 'First I get up and bathe in the bathtub.' },
          { speaker: '🧑', es: '¿Te maquillas por la mañana?', en: 'Do you put on makeup in the morning?' },
          { speaker: '👩', es: 'Sí, me maquillo y me pongo la ropa.', en: 'Yes, I put on makeup and put on my clothes.' },
          { speaker: '🧑', es: '¿A qué hora te levantas?', en: 'What time do you get up?' },
          { speaker: '👩', es: 'Me levanto tarde los fines de semana.', en: 'I get up late on weekends.' }
        ]
      }
    ];

    var dialogue = pick(dialogues);
    var html = '💬 <strong>Practice Dialogue: ' + dialogue.title + '</strong>\n\n<div class="dialogue">';
    for (var i = 0; i < dialogue.lines.length; i++) {
      var line = dialogue.lines[i];
      html += '<div class="dialogue-line">';
      html += '<span class="dialogue-speaker">' + line.speaker + '</span> ';
      html += '<span class="spanish-text">' + line.es + '</span>';
      html += '<br><span class="dialogue-translation">' + line.en + '</span>';
      html += '</div>';
    }
    html += '</div>';
    html += '\n\n💡 <em>Try reading the Spanish parts out loud! Practice makes perfect. Say <strong>"another"</strong> for a different dialogue.</em>';
    return html;
  }

  function generateCorrection(text) {
    // Extract the Spanish text — strip common prefixes
    var spanish = text.replace(/^(is this correct|check this|correct this|review|check my spanish|correct my spanish)[:\s]*/i, '').trim();

    // If no Spanish-looking text was provided, prompt the user
    if (!spanish || !/[a-záéíóúüñ]/i.test(spanish)) {
      return 'I\'d be happy to check your Spanish! Just type a sentence in Spanish and I\'ll do my best to give feedback.\n\nFor example, try writing: <em>"Yo soy un estudiante"</em> or <em>"Me gusta la comida"</em>\n\n' +
        '💡 <em>Note: I can catch common mistakes, but I\'m a teaching tool, not a full grammar checker. For complex sentences, I recommend practicing the grammar rules I\'ve taught you!</em>';
    }

    var lower = spanish.toLowerCase();
    var feedback = [];

    // Check ser/estar misuse — common adjective patterns
    var estarAdjectives = ['cansado','cansada','enfermo','enferma','contento','contenta','enojado','enojada','aburrido','aburrida','preocupado','preocupada','ocupado','ocupada','listo','lista','nervioso','nerviosa','triste','feliz','molesto','molesta'];
    var serAdjectives = ['alto','alta','bajo','baja','grande','pequeño','pequeña','inteligente','bonito','bonita','feo','fea','joven','viejo','vieja','rico','rica','pobre','importante','difícil','fácil'];

    for (var i = 0; i < estarAdjectives.length; i++) {
      var adj = estarAdjectives[i];
      if (lower.indexOf(adj) !== -1 && /\b(soy|eres|es|somos|son)\s+/.test(lower) && lower.indexOf(adj) > lower.search(/\b(soy|eres|es|somos|son)\b/)) {
        feedback.push('⚠️ <strong>"' + adj + '"</strong> describes a temporary state or condition — use <strong class="spanish-text">estar</strong> instead of <strong class="spanish-text">ser</strong>.\n  → <em>Example: <span class="spanish-text">Yo <strong>estoy</strong> ' + adj + '</span></em>');
        break;
      }
    }

    for (var i = 0; i < serAdjectives.length; i++) {
      var adj = serAdjectives[i];
      if (lower.indexOf(adj) !== -1 && /\b(estoy|estás|está|estamos|están)\s+/.test(lower) && lower.indexOf(adj) > lower.search(/\b(estoy|estás|está|estamos|están)\b/)) {
        feedback.push('⚠️ <strong>"' + adj + '"</strong> describes an inherent characteristic — use <strong class="spanish-text">ser</strong> instead of <strong class="spanish-text">estar</strong>.\n  → <em>Example: <span class="spanish-text">Yo <strong>soy</strong> ' + adj + '</span></em>');
        break;
      }
    }

    // Check gender agreement — common mismatches
    var feminineNouns = ['casa','mesa','silla','comida','persona','mujer','niña','chica','manzana','naranja','escuela','iglesia','camisa','puerta','ventana','cama'];
    var masculineNouns = ['libro','perro','gato','coche','hombre','niño','chico','zapato','sombrero','plato','vaso','piso','cuarto','baño','museo','parque'];

    for (var i = 0; i < feminineNouns.length; i++) {
      var noun = feminineNouns[i];
      var pattern = new RegExp('\\b(el|un)\\s+' + noun + '\\b');
      if (pattern.test(lower)) {
        feedback.push('⚠️ <strong class="spanish-text">"' + noun + '"</strong> is feminine — use <strong class="spanish-text">la</strong> or <strong class="spanish-text">una</strong> instead of <strong class="spanish-text">el/un</strong>.\n  → <em><span class="spanish-text"><strong>La</strong> ' + noun + '</span></em>');
        break;
      }
    }

    for (var i = 0; i < masculineNouns.length; i++) {
      var noun = masculineNouns[i];
      var pattern = new RegExp('\\b(la|una)\\s+' + noun + '\\b');
      if (pattern.test(lower)) {
        feedback.push('⚠️ <strong class="spanish-text">"' + noun + '"</strong> is masculine — use <strong class="spanish-text">el</strong> or <strong class="spanish-text">un</strong> instead of <strong class="spanish-text">la/una</strong>.\n  → <em><span class="spanish-text"><strong>El</strong> ' + noun + '</span></em>');
        break;
      }
    }

    // Check "me gusta" agreement — common mistake: "me gusta" + plural noun
    var gustaMatch = lower.match(/\bme gusta\s+(?:los|las|muchos|muchas|[a-záéíóúüñ]+s)\b/);
    if (gustaMatch && !/\bme gustan\b/.test(lower)) {
      feedback.push('⚠️ When the thing you like is <strong>plural</strong>, use <strong class="spanish-text">me gustan</strong> (not <em>me gusta</em>).\n  → <em><span class="spanish-text">Me <strong>gustan</strong> los gatos.</span></em>');
    }

    // Check double negative awareness (not an error in Spanish, but worth noting for learners)
    if (/\bno\b.*\bnada\b/.test(lower) || /\bno\b.*\bnadie\b/.test(lower) || /\bno\b.*\bnunca\b/.test(lower)) {
      feedback.push('✅ Good use of the <strong>double negative</strong>! In Spanish, double negatives are correct and required: <span class="spanish-text">"No tengo <strong>nada</strong>"</span> = "I don\'t have anything."');
    }

    if (feedback.length > 0) {
      return '📝 <strong>Here\'s my feedback on:</strong> <em class="spanish-text">"' + spanish + '"</em>\n\n' +
        feedback.join('\n\n') +
        '\n\n💡 <em>Keep practicing! These are common mistakes that even advanced learners make.</em>';
    }

    // No issues detected
    return '✅ <strong>Your Spanish looks good!</strong> <em class="spanish-text">"' + spanish + '"</em>\n\n' +
      'I didn\'t spot any common errors. ¡Buen trabajo! 🌟\n\n' +
      '💡 <em>Note: I check for common ser/estar, gender, and agreement mistakes. For advanced grammar, keep studying the rules in the Grammar section!</em>';
  }

  /**
   * Get the fallback response when no intent is matched.
   */
  function getFallback(text) {
    // Check if the text might be a Spanish word
    var entry = Dictionary.lookup(text.trim());
    if (entry) {
      return 'It looks like you typed <strong class="spanish-text">"' + entry.es + '"</strong> — that means <strong>"' + entry.en + '"</strong> in English!' +
        (entry.pronunciation ? ' (🔊 ' + entry.pronunciation + ')' : '') +
        (entry.example ? '\n\n<em>Example: <span class="spanish-text">' + entry.example + '</span></em>' : '') +
        '\n\n💡 <em>Want to practice more Unidad 2A1 vocab? Try "quiz me" or "vocab list"!</em>';
    }

    var fallbacks = [
      'Hmm, I\'m not quite sure what you mean. Here are things you can do in <strong>3rd Hour Spanish</strong>:\n\n• <strong>"Quiz me"</strong> — Unidad 2A1 vocabulary quiz\n• <strong>"Vocab list"</strong> — See all unit words\n• <strong>"Reflexive verbs"</strong> — Grammar explanation\n• <strong>"Practice conversation"</strong> — Daily routine dialogue\n• <strong>"Flashcards"</strong> — Review your cards\n\nOr type <strong>"help"</strong> for the full list! 🇪🇸',
      'I didn\'t quite catch that! I\'m here to help you with Unidad 2A1 — daily routines, reflexive verbs, and bathroom vocabulary. Try asking me something specific! 🇪🇸',
      '¡Perdón! Try one of these:\n\n• <strong>"Quiz me on 2A1"</strong>\n• <strong>"How do you say towel in Spanish?"</strong>\n• <strong>"Explain reflexive verbs"</strong>\n• <strong>"Practice daily routine"</strong>'
    ];
    return pick(fallbacks);
  }

  // ── SRS / Flashcard Review ─────────────────────────────────

  function generateSRSReview() {
    if (typeof SRS === 'undefined') {
      return 'The flashcard system is still loading… please try again in a moment! 🃏';
    }

    var stats = SRS.getStats();

    // If deck is empty, auto-generate starter cards from dictionary
    if (stats.total === 0) {
      var cats = Dictionary.getCategories();
      var seeded = 0;
      for (var c = 0; c < cats.length && seeded < 20; c++) {
        var words = Dictionary.getCategory(cats[c]);
        for (var w = 0; w < words.length && seeded < 20; w++) {
          SRS.addVocabularyCard(words[w]);
          seeded++;
        }
      }
      SRS.save();
      stats = SRS.getStats();
    }

    var dueCards = SRS.getDueCards(10);

    if (dueCards.length === 0) {
      return SRS.formatDeckOverview() +
        '\n\n✅ <strong>No cards due right now!</strong> Great job staying on top of your reviews. Come back later or learn new words to add more cards. 🌟';
    }

    // Start a review session
    var sessionHtml = SRS.startSession(10);
    if (sessionHtml) {
      return '🃏 <strong>Flashcard Review Session</strong>\n\n' +
        'You have <strong>' + dueCards.length + '</strong> card(s) due for review.\n\n' +
        sessionHtml +
        '\n\n💡 <em>Type <strong>\"show answer\"</strong> to flip the card, or type your answer!</em>';
    }

    return SRS.formatDeckOverview();
  }

  // ── Learning Path / Curriculum ─────────────────────────────

  function generateLearningPath() {
    if (typeof LearningPaths === 'undefined') {
      return 'The learning path system is still loading… please try again in a moment! 📚';
    }

    var progress = LearningPaths.getOverallProgress();
    var currentLesson = LearningPaths.getCurrentLesson();

    var html = LearningPaths.formatLevelsOverview();

    if (currentLesson) {
      html += '\n\n📖 <strong>Your next lesson:</strong>\n' +
        LearningPaths.formatLessonOverview(currentLesson.lesson) +
        '\n\n💡 <em>Type <strong>\"start lesson\"</strong> to begin, or choose any topic from the sidebar!</em>';
    } else {
      html += '\n\n🎉 <strong>You\'ve completed all available lessons!</strong> Amazing work! Keep practicing with quizzes and flashcards. 🌟';
    }

    return html;
  }

  // ── Grammar Analysis ───────────────────────────────────────

  function generateAnalysis(text) {
    if (typeof Analyzer === 'undefined') {
      return 'The analysis module is still loading… please try again in a moment! 🔍';
    }

    // Try to extract Spanish text from the input
    var spanishText = text.replace(/^(analyze|analysis|check|parse|break down|tag)\s*(this\s*)?(sentence\s*)?:?\s*/i, '').trim();

    if (!spanishText || spanishText.length < 2) {
      return '🔍 <strong>Sentence Analyzer</strong>\n\n' +
        'Give me a Spanish sentence to analyze! For example:\n\n' +
        '• <em>"Analyze: Yo soy contento"</em>\n' +
        '• <em>"Analyze: Los gatos son bonitos"</em>\n\n' +
        'I\'ll check for grammar errors, identify parts of speech, and detect the language! 📝';
    }

    var analysis = Analyzer.fullAnalysis(spanishText);
    return Analyzer.formatAnalysis(analysis);
  }

  // ── Idioms ─────────────────────────────────────────────────

  function generateIdiom() {
    var idioms = [
      { es: 'No hay mal que por bien no venga.', en: 'Every cloud has a silver lining.', literal: 'There is no bad that doesn\'t come for good.', usage: 'Used to comfort someone after a setback.' },
      { es: 'El que mucho abarca, poco aprieta.', en: 'Jack of all trades, master of none.', literal: 'He who grabs a lot, squeezes little.', usage: 'Warning against taking on too many tasks.' },
      { es: 'Más vale tarde que nunca.', en: 'Better late than never.', literal: 'More worth late than never.', usage: 'Encouraging someone who is late to still carry on.' },
      { es: 'En boca cerrada no entran moscas.', en: 'Silence is golden.', literal: 'Flies don\'t enter a closed mouth.', usage: 'Advising someone to keep quiet.' },
      { es: 'A caballo regalado no le mires el diente.', en: 'Don\'t look a gift horse in the mouth.', literal: 'Don\'t look at the teeth of a gifted horse.', usage: 'Be grateful for gifts, don\'t criticize them.' },
      { es: 'Cuando el río suena, agua lleva.', en: 'Where there\'s smoke, there\'s fire.', literal: 'When the river sounds, it carries water.', usage: 'Rumors usually have some truth.' },
      { es: 'No es oro todo lo que reluce.', en: 'All that glitters is not gold.', literal: 'Not everything that shines is gold.', usage: 'Things aren\'t always as good as they appear.' },
      { es: 'Dime con quién andas, y te diré quién eres.', en: 'You are known by the company you keep.', literal: 'Tell me who you walk with and I\'ll tell you who you are.', usage: 'People judge you by your friends.' },
      { es: 'El hábito no hace al monje.', en: 'Don\'t judge a book by its cover.', literal: 'The habit doesn\'t make the monk.', usage: 'Appearances can be deceiving.' },
      { es: 'Ojos que no ven, corazón que no siente.', en: 'Out of sight, out of mind.', literal: 'Eyes that don\'t see, heart that doesn\'t feel.', usage: 'What you don\'t know won\'t hurt you.' },
      { es: 'Camarón que se duerme, se lo lleva la corriente.', en: 'You snooze, you lose.', literal: 'The shrimp that falls asleep gets carried by the current.', usage: 'Stay alert or miss opportunities.' },
      { es: 'Más vale prevenir que curar.', en: 'An ounce of prevention is worth a pound of cure.', literal: 'Better to prevent than to cure.', usage: 'Take precautions before problems arise.' }
    ];

    var idiom = idioms[Math.floor(Math.random() * idioms.length)];

    return '🗣️ <strong>Spanish Idiom</strong>\n\n' +
      '<div class="word-of-day">' +
      '<div class="wod-label">Idiom / Refrán</div>' +
      '<div class="wod-spanish">' + idiom.es + '</div>' +
      '<div class="wod-english">🇬🇧 ' + idiom.en + '</div>' +
      '<div class="wod-pronunciation">📝 Literal: "' + idiom.literal + '"</div>' +
      '<div class="wod-example">💡 ' + idiom.usage + '</div>' +
      '</div>' +
      '\n\n<em>Say <strong>"another"</strong> for a different idiom!</em> 🌟';
  }

  // ── Daily Challenge ────────────────────────────────────────

  function generateDailyChallenge() {
    var challengeTypes = ['translate', 'conjugate', 'fillblank', 'unscramble'];
    var type = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];

    switch (type) {
      case 'translate': {
        var entry = Dictionary.getRandom();
        if (!entry) return 'No vocabulary available for a challenge right now. Try again later! 🎯';
        return '🏆 <strong>Daily Challenge: Translation</strong>\n\n' +
          'Translate this word to Spanish:\n\n' +
          '<div class="quiz-question"><div class="quiz-prompt"><strong>' + entry.en + '</strong></div></div>\n\n' +
          '💡 <em>Type your answer below! (Answer: <span style="color:transparent;user-select:text">' + entry.es + '</span>)</em>';
      }
      case 'conjugate': {
        var verbs = ['hablar', 'comer', 'vivir', 'ser', 'estar', 'tener', 'ir', 'hacer', 'poder', 'decir', 'querer', 'saber'];
        var tenses = ['present', 'preterite', 'imperfect', 'future'];
        var pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos/ellas'];
        var verb = verbs[Math.floor(Math.random() * verbs.length)];
        var tense = tenses[Math.floor(Math.random() * tenses.length)];
        var pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
        var conjugated = Conjugation.conjugate(verb, tense);
        var pronounIndex = Conjugation.PRONOUNS.indexOf(pronoun);
        var answer = conjugated && pronounIndex !== -1 ? conjugated[pronounIndex] : '?';
        return '🏆 <strong>Daily Challenge: Conjugation</strong>\n\n' +
          'Conjugate <strong class="spanish-text">' + verb + '</strong> for <strong>' + pronoun + '</strong> in the <strong>' + tense + '</strong> tense.\n\n' +
          '💡 <em>Type your answer below! (Answer: <span style="color:transparent;user-select:text">' + answer + '</span>)</em>';
      }
      case 'fillblank': {
        var sentences = [
          { sentence: 'Yo ___ estudiante. (to be — permanent)', answer: 'soy', hint: 'ser' },
          { sentence: 'Ella ___ cansada. (to be — temporary)', answer: 'está', hint: 'estar' },
          { sentence: 'Nosotros ___ al parque. (to go)', answer: 'vamos', hint: 'ir' },
          { sentence: 'Tú ___ mucho café. (to drink)', answer: 'bebes', hint: 'beber' },
          { sentence: 'Ellos ___ la verdad. (to know — facts)', answer: 'saben', hint: 'saber' },
          { sentence: 'Yo ___ hambre. (to have)', answer: 'tengo', hint: 'tener' },
          { sentence: 'Él ___ español y francés. (to speak)', answer: 'habla', hint: 'hablar' },
          { sentence: 'Nosotros ___ en Madrid. (to live)', answer: 'vivimos', hint: 'vivir' }
        ];
        var s = sentences[Math.floor(Math.random() * sentences.length)];
        return '🏆 <strong>Daily Challenge: Fill in the Blank</strong>\n\n' +
          '<div class="quiz-question"><div class="quiz-prompt">' + s.sentence + '</div></div>\n\n' +
          '💡 Hint: <em>' + s.hint + '</em>\n\n' +
          '<em>Type your answer below! (Answer: <span style="color:transparent;user-select:text">' + s.answer + '</span>)</em>';
      }
      case 'unscramble': {
        var words = [
          { scrambled: 'OALH', answer: 'HOLA', meaning: 'Hello' },
          { scrambled: 'SGRAICA', answer: 'GRACIAS', meaning: 'Thank you' },
          { scrambled: 'UEBNSO SAÍD', answer: 'BUENOS DÍAS', meaning: 'Good morning' },
          { scrambled: 'MIAGO', answer: 'AMIGO', meaning: 'Friend' },
          { scrambled: 'SCAUA', answer: 'CAUSA', meaning: 'Cause' },
          { scrambled: 'OLIRBAS', answer: 'SABORIL', meaning: '—' }
        ];
        // Filter out bad entries
        var validWords = words.filter(function (w) { return w.meaning !== '—'; });
        var w = validWords[Math.floor(Math.random() * validWords.length)];
        return '🏆 <strong>Daily Challenge: Unscramble</strong>\n\n' +
          'Unscramble this Spanish word:\n\n' +
          '<div class="quiz-question"><div class="quiz-prompt" style="font-size:1.4em;letter-spacing:0.15em">' + w.scrambled + '</div></div>\n\n' +
          '💡 Hint: It means <em>"' + w.meaning + '"</em>\n\n' +
          '<em>Type your answer below! (Answer: <span style="color:transparent;user-select:text">' + w.answer + '</span>)</em>';
      }
      default:
        return '🏆 <strong>Daily Challenge</strong>\n\nTranslate: <strong>"Good morning"</strong> to Spanish!\n\n💡 <em>(Answer: Buenos días)</em>';
    }
  }

  return {
    static_responses: static_responses,
    pick: pick,
    generateTranslateToSpanish: generateTranslateToSpanish,
    generateTranslateToEnglish: generateTranslateToEnglish,
    generateConjugation: generateConjugation,
    generateGrammarExplanation: generateGrammarExplanation,
    generateVocabularyLesson: generateVocabularyLesson,
    generatePhraseResponse: generatePhraseResponse,
    generatePronunciation: generatePronunciation,
    generateCulturalInfo: generateCulturalInfo,
    generateWordOfDay: generateWordOfDay,
    generateDifficultyChange: generateDifficultyChange,
    generateCountingLesson: generateCountingLesson,
    generateTimeDateLesson: generateTimeDateLesson,
    generateLessonSuggestion: generateLessonSuggestion,
    generatePracticeConversation: generatePracticeConversation,
    generateCorrection: generateCorrection,
    generateSRSReview: generateSRSReview,
    generateLearningPath: generateLearningPath,
    generateAnalysis: generateAnalysis,
    generateIdiom: generateIdiom,
    generateDailyChallenge: generateDailyChallenge,
    getFallback: getFallback
  };
})();
