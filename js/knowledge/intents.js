// ============================================================
// Intents Database — 40+ Spanish-teaching intents with
// training phrases for the classifier
// ============================================================
var Intents = (function () {
  'use strict';

  var defaultIntents = [
    // --- Greetings ---
    {
      tag: 'greeting',
      patterns: [
        'hello', 'hi', 'hey', 'howdy', 'hola', 'good morning',
        'good afternoon', 'good evening', 'greetings', 'what\'s up',
        'sup', 'hey there', 'hi there', 'hello there', 'buenos dias'
      ],
      context: null
    },
    {
      tag: 'farewell',
      patterns: [
        'bye', 'goodbye', 'see you', 'see you later', 'adios',
        'cya', 'talk to you later', 'gotta go', 'hasta luego',
        'bye bye', 'good night', 'i have to go', 'farewell',
        'buenas noches', 'hasta mañana', 'chao'
      ],
      context: null
    },

    // --- Translation ---
    {
      tag: 'translate_to_spanish',
      patterns: [
        'how do you say', 'how to say', 'translate to spanish',
        'what is in spanish', 'what\'s in spanish', 'spanish word for',
        'spanish for', 'say in spanish', 'how would you say',
        'translate', 'in spanish', 'how is said in spanish',
        'tell me the spanish word for', 'spanish translation of'
      ],
      context: null
    },
    {
      tag: 'translate_to_english',
      patterns: [
        'what does mean', 'what does this mean', 'meaning of',
        'translate to english', 'what is in english', 'english for',
        'what\'s in english', 'what does mean in english',
        'translate from spanish', 'translate this'
      ],
      context: null
    },

    // --- Conjugation ---
    {
      tag: 'conjugate_verb',
      patterns: [
        'conjugate', 'conjugation', 'how do you conjugate',
        'conjugation of', 'conjugate the verb', 'verb conjugation',
        'how to conjugate', 'present tense of', 'past tense of',
        'future tense of', 'preterite of', 'imperfect of',
        'conditional of', 'subjunctive of', 'can you conjugate',
        'show me the conjugation'
      ],
      context: null
    },

    // --- Grammar ---
    {
      tag: 'explain_grammar',
      patterns: [
        'explain', 'grammar', 'grammar rule', 'how does work',
        'teach me about', 'tell me about', 'what is the rule for',
        'when do you use', 'difference between', 'ser vs estar',
        'por vs para', 'ser or estar', 'por or para',
        'adjective placement', 'gender agreement', 'articles',
        'subject pronouns', 'object pronouns', 'reflexive verbs',
        'subjunctive', 'negation', 'question words', 'prepositions',
        'preterite vs imperfect', 'grammar topic', 'grammar lesson',
        'can you explain', 'how to use', 'rule for'
      ],
      context: null
    },

    // --- Vocabulary Lessons ---
    {
      tag: 'vocabulary_lesson',
      patterns: [
        'teach me vocabulary', 'vocabulary', 'vocab', 'word list',
        'teach me words', 'learn words', 'vocabulary lesson',
        'teach me some words', 'common words', 'basic words',
        'show me words', 'words about', 'vocabulary about',
        'teach me food words', 'teach me colors', 'teach me numbers',
        'teach me animals', 'teach me body parts', 'teach me family',
        'teach me clothing', 'word category', 'vocabulary category',
        'what are the spanish words for', 'give me vocabulary'
      ],
      context: null
    },

    // --- Quiz ---
    {
      tag: 'quiz_start',
      patterns: [
        'quiz me', 'test me', 'quiz', 'test', 'practice', 'drill',
        'vocabulary quiz', 'conjugation quiz', 'give me a quiz',
        'start a quiz', 'let\'s practice', 'i want to practice',
        'test my knowledge', 'challenge me', 'flashcards',
        'quiz me on', 'test me on', 'practice vocabulary',
        'practice conjugation', 'can you quiz me', 'give me a test'
      ],
      context: null
    },
    {
      tag: 'quiz_answer',
      patterns: [], // Handled dynamically when quiz is active
      context: 'quiz_active'
    },

    // --- Phrases ---
    {
      tag: 'phrase_request',
      patterns: [
        'useful phrases', 'common phrases', 'give me phrases',
        'phrases for', 'what to say at', 'what to say in',
        'restaurant phrases', 'travel phrases', 'hotel phrases',
        'emergency phrases', 'shopping phrases', 'direction phrases',
        'how to order food', 'how to ask for directions',
        'phone phrases', 'polite phrases', 'survival phrases',
        'essential phrases', 'important phrases', 'key phrases',
        'situational phrases', 'phrases about', 'weather phrases',
        'small talk phrases'
      ],
      context: null
    },

    // --- Pronunciation ---
    {
      tag: 'pronunciation_help',
      patterns: [
        'how to pronounce', 'pronunciation', 'how do you pronounce',
        'how is pronounced', 'pronunciation of', 'say it',
        'how to say it', 'pronunciation guide', 'pronunciation tips',
        'spanish pronunciation', 'how do spanish people say',
        'correct pronunciation', 'help me pronounce'
      ],
      context: null
    },

    // --- Cultural Info ---
    {
      tag: 'cultural_info',
      patterns: [
        'culture', 'spanish culture', 'tell me about spain',
        'spanish traditions', 'customs', 'spanish customs',
        'spanish speaking countries', 'where is spanish spoken',
        'how many people speak spanish', 'spanish dialects',
        'spain vs latin america', 'cultural differences',
        'slang', 'spanish slang', 'regional differences',
        'interesting facts about spanish', 'history of spanish',
        'where do they speak spanish'
      ],
      context: null
    },

    // --- Difficulty ---
    {
      tag: 'change_difficulty',
      patterns: [
        'beginner', 'intermediate', 'advanced', 'harder',
        'easier', 'too easy', 'too hard', 'change difficulty',
        'set difficulty', 'i am a beginner', 'i am intermediate',
        'i am advanced', 'make it harder', 'make it easier',
        'increase difficulty', 'decrease difficulty', 'level up',
        'simpler please', 'more advanced please'
      ],
      context: null
    },

    // --- Lesson Request ---
    {
      tag: 'lesson_request',
      patterns: [
        'teach me', 'give me a lesson', 'lesson', 'start a lesson',
        'i want to learn', 'learn spanish', 'teach me spanish',
        'next lesson', 'another lesson', 'what should i learn',
        'what can you teach', 'what topics do you cover',
        'help me learn', 'start learning', 'begin lesson',
        'i want to study'
      ],
      context: null
    },

    // --- Practice Conversation ---
    {
      tag: 'practice_conversation',
      patterns: [
        'practice conversation', 'let\'s talk in spanish',
        'conversation practice', 'speak spanish with me',
        'practice speaking', 'have a conversation',
        'dialogue practice', 'talk to me in spanish',
        'let\'s practice talking', 'spanish conversation',
        'practice dialogue'
      ],
      context: null
    },

    // --- Correct My Spanish ---
    {
      tag: 'correct_spanish',
      patterns: [
        'correct my spanish', 'is this correct', 'check my spanish',
        'did i say it right', 'is this right', 'grammar check',
        'check my grammar', 'am i saying this correctly',
        'is this sentence correct', 'fix my spanish',
        'correct this', 'review my spanish'
      ],
      context: null
    },

    // --- Word of the Day ---
    {
      tag: 'word_of_day',
      patterns: [
        'word of the day', 'daily word', 'random word',
        'give me a word', 'teach me a new word',
        'new word', 'today\'s word', 'what\'s the word of the day',
        'surprise me with a word', 'learn a new word'
      ],
      context: null
    },

    // --- About Self ---
    {
      tag: 'about_self',
      patterns: [
        'who are you', 'what are you', 'what\'s your name',
        'tell me about yourself', 'what can you do',
        'what do you do', 'are you a teacher', 'are you real',
        'are you human', 'are you a bot', 'are you ai',
        'your name', 'how do you work', 'what is this'
      ],
      context: null
    },

    // --- Help ---
    {
      tag: 'help',
      patterns: [
        'help', 'help me', 'what can you do', 'commands',
        'how does this work', 'instructions', 'features',
        'what can i ask', 'what do you offer', 'options',
        'how to use', 'guide', 'tutorial', 'getting started',
        'menu', 'what are my options', 'what commands are there'
      ],
      context: null
    },

    // --- Thanks ---
    {
      tag: 'thanks',
      patterns: [
        'thank you', 'thanks', 'gracias', 'muchas gracias',
        'appreciate it', 'thank you so much', 'thanks a lot',
        'that\'s helpful', 'very helpful', 'great help',
        'thanks for the help', 'you\'re helpful', 'awesome thanks'
      ],
      context: null
    },

    // --- Positive Response ---
    {
      tag: 'positive',
      patterns: [
        'yes', 'sure', 'okay', 'ok', 'yeah', 'yep', 'si',
        'absolutely', 'of course', 'definitely', 'right',
        'correct', 'that\'s right', 'exactly', 'you got it',
        'let\'s do it', 'sounds good', 'perfect', 'great',
        'please', 'go ahead', 'continue', 'more'
      ],
      context: null
    },

    // --- Negative Response ---
    {
      tag: 'negative',
      patterns: [
        'no', 'nope', 'nah', 'not really', 'no thanks',
        'no thank you', 'i don\'t want', 'stop', 'nevermind',
        'skip', 'pass', 'i\'m good', 'not now',
        'maybe later', 'not interested'
      ],
      context: null
    },

    // --- Another / Next ---
    {
      tag: 'next',
      patterns: [
        'another', 'next', 'more', 'give me another',
        'one more', 'another one', 'next one', 'keep going',
        'continue', 'show me more', 'another word',
        'another phrase', 'next question', 'again',
        'different one', 'something else'
      ],
      context: null
    },

    // --- Numbers question ---
    {
      tag: 'count_spanish',
      patterns: [
        'how do you count', 'count in spanish', 'numbers in spanish',
        'spanish numbers', 'count to ten', 'count to twenty',
        'count to one hundred', 'how to count', 'teach me to count',
        'teach me numbers', 'what are the numbers'
      ],
      context: null
    },

    // --- Time/Date ---
    {
      tag: 'ask_time',
      patterns: [
        'how to tell time', 'telling time in spanish',
        'what time is it in spanish', 'time in spanish',
        'how to say the time', 'days of the week in spanish',
        'months in spanish', 'days of the week', 'months of the year',
        'how to say days', 'how to say months'
      ],
      context: null
    },

    // --- Alphabet / Pronunciation Basics ---
    {
      tag: 'alphabet',
      patterns: [
        'spanish alphabet', 'alphabet', 'letters in spanish',
        'how many letters', 'special letters', 'ñ', 'enye',
        'accent marks', 'accents', 'tildes', 'spanish letters',
        'how to type accents', 'special characters'
      ],
      context: null
    },

    // --- SRS / Flashcard Review ---
    {
      tag: 'review_srs',
      patterns: [
        'review flashcards', 'flashcard review', 'study cards',
        'spaced repetition', 'review my deck', 'srs review',
        'what\'s due for review', 'flashcards', 'review cards',
        'show my flashcards', 'practice flashcards',
        'start review session', 'review vocabulary cards'
      ],
      context: null
    },

    // --- Learning Path / Curriculum ---
    {
      tag: 'show_learning_path',
      patterns: [
        'learning path', 'show curriculum', 'my curriculum',
        'show lessons', 'what lesson am i on', 'cefr level',
        'course overview', 'show my progress', 'lesson plan',
        'what level am i', 'learning roadmap', 'my learning path',
        'where am i in the course', 'show course',
        'structured lessons', 'start curriculum'
      ],
      context: null
    },

    // --- Grammar Analysis ---
    {
      tag: 'analyze_spanish',
      patterns: [
        'analyze this sentence', 'analyze my spanish',
        'full analysis', 'pos tag', 'part of speech',
        'sentence analysis', 'break down this sentence',
        'parse this sentence', 'language analysis',
        'what parts of speech', 'tag this sentence'
      ],
      context: null
    },

    // --- Idioms ---
    {
      tag: 'idiom_request',
      patterns: [
        'teach me an idiom', 'spanish idioms', 'common expressions',
        'idiomatic expressions', 'give me an idiom', 'popular saying',
        'spanish saying', 'refrán', 'dichos', 'teach me a saying',
        'expressions in spanish', 'what are some spanish idioms'
      ],
      context: null
    },

    // --- Daily Challenge ---
    {
      tag: 'daily_challenge',
      patterns: [
        'daily challenge', 'today\'s challenge', 'give me a challenge',
        'challenge me', 'spanish challenge', 'practice challenge',
        'test my skills', 'give me something hard',
        'challenge of the day', 'try a challenge'
      ],
      context: null
    }
  ];

  var intents = [];

  function init() {
    intents = defaultIntents.slice();
    // Load custom intents from localStorage
    try {
      var custom = localStorage.getItem('profesor_custom_intents');
      if (custom) {
        var parsed = JSON.parse(custom);
        intents = intents.concat(parsed);
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  function getAll() {
    return intents;
  }

  function getByTag(tag) {
    for (var i = 0; i < intents.length; i++) {
      if (intents[i].tag === tag) return intents[i];
    }
    return null;
  }

  function addCustomIntent(intent) {
    intents.push(intent);
    saveCustom();
  }

  function saveCustom() {
    var custom = [];
    var defaultTags = {};
    for (var i = 0; i < defaultIntents.length; i++) {
      defaultTags[defaultIntents[i].tag] = true;
    }
    for (var i = 0; i < intents.length; i++) {
      if (!defaultTags[intents[i].tag]) {
        custom.push(intents[i]);
      }
    }
    try {
      localStorage.setItem('profesor_custom_intents', JSON.stringify(custom));
    } catch (e) {
      // Storage full or unavailable
    }
  }

  init();

  return {
    getAll: getAll,
    getByTag: getByTag,
    addCustomIntent: addCustomIntent,
    init: init
  };
})();
