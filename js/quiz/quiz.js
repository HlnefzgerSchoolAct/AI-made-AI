// ============================================================
// Quiz Engine — generates and scores interactive quizzes
// Types: vocab EN→ES, vocab ES→EN, conjugation, fill-blank
// ============================================================
var Quiz = (function () {
  'use strict';

  var current = null; // { type, questions[], index, score, total }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ---- Question generators ----

  function generateVocabQuestions(category, count) {
    var pool;
    if (category) {
      pool = Dictionary.getCategory(category);
    }
    if (!pool || pool.length < 4) {
      // Mix from all categories
      var cats = Dictionary.getCategories();
      pool = [];
      for (var i = 0; i < cats.length; i++) {
        var catWords = Dictionary.getCategory(cats[i]);
        if (catWords) pool = pool.concat(catWords);
      }
    }
    pool = shuffle(pool);
    var questions = [];
    count = Math.min(count, pool.length);
    for (var i = 0; i < count; i++) {
      var word = pool[i];
      // Alternate EN→ES and ES→EN
      if (i % 2 === 0) {
        // Generate 3 wrong answers
        var choices = [word.es];
        var tries = 0;
        while (choices.length < 4 && tries < 30) {
          var rnd = pick(pool);
          if (choices.indexOf(rnd.es) === -1) choices.push(rnd.es);
          tries++;
        }
        choices = shuffle(choices);
        questions.push({
          type: 'en_to_es',
          prompt: 'What is <strong>"' + word.en + '"</strong> in Spanish?',
          answer: word.es.toLowerCase(),
          choices: choices,
          correctIndex: choices.indexOf(word.es)
        });
      } else {
        var choices = [word.en];
        var tries = 0;
        while (choices.length < 4 && tries < 30) {
          var rnd = pick(pool);
          if (choices.indexOf(rnd.en) === -1) choices.push(rnd.en);
          tries++;
        }
        choices = shuffle(choices);
        questions.push({
          type: 'es_to_en',
          prompt: 'What does <strong class="spanish-text">"' + word.es + '"</strong> mean in English?',
          answer: word.en.toLowerCase(),
          choices: choices,
          correctIndex: choices.indexOf(word.en)
        });
      }
    }
    return questions;
  }

  function generateConjugationQuestions(count) {
    // Focus on Unidad 2A1 reflexive verbs
    var reflexiveVerbs = ['bañarse', 'cepillarse', 'despertarse', 'ducharse', 'lavarse', 'levantarse', 'maquillarse', 'peinarse', 'ponerse', 'quitarse', 'vestirse'];
    var tenses = ['present'];
    var pronouns = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'ellos/ellas/ustedes'];
    var pronounIndex = { 'yo': 0, 'tú': 1, 'él/ella/usted': 2, 'nosotros': 3, 'ellos/ellas/ustedes': 5 };
    var questions = [];

    for (var i = 0; i < count; i++) {
      var verb = pick(reflexiveVerbs);
      var tense = pick(tenses);
      var pronoun = pick(pronouns);
      var result = typeof Conjugation !== 'undefined' ? Conjugation.conjugateReflexive(verb, tense) : null;
      if (!result || !result.conjugations) {
        // Fallback to non-reflexive
        var base = verb.replace(/se$/, '');
        result = Conjugation.conjugate(base, tense);
      }
      if (!result || !result.conjugations) continue;
      var correctForm = result.conjugations[pronounIndex[pronoun]] ? result.conjugations[pronounIndex[pronoun]].form : null;
      if (!correctForm) continue;

      questions.push({
        type: 'conjugation',
        prompt: 'Conjugate <strong class="spanish-text">' + verb + '</strong> for <strong>' + pronoun + '</strong> in the <strong>' + tense + '</strong> tense:',
        answer: correctForm.toLowerCase(),
        choices: null // free-form answer
      });
    }
    return questions;
  }

  // ---- Quiz control ----

  function start(category) {
    // Default to Unidad 2A1 vocabulary
    if (!category) category = 'unidad2a1';
    var type = Math.random() < 0.6 ? 'vocab' : 'conjugation';
    var questions;
    var totalQ = 5;

    if (type === 'vocab') {
      questions = generateVocabQuestions(category, totalQ);
    } else {
      questions = generateConjugationQuestions(totalQ);
      if (questions.length === 0) {
        questions = generateVocabQuestions(category, totalQ);
        type = 'vocab';
      }
    }

    if (questions.length === 0) {
      return 'Sorry, I couldn\'t generate quiz questions. Try another category!';
    }

    current = {
      type: type,
      questions: questions,
      index: 0,
      score: 0,
      total: questions.length
    };

    return formatQuestion();
  }

  function formatQuestion() {
    if (!current || current.index >= current.questions.length) return null;
    var q = current.questions[current.index];
    var html = '<div class="quiz-question">';
    html += '<div class="quiz-progress">Question ' + (current.index + 1) + ' of ' + current.total + ' | Score: ' + current.score + '/' + current.index + '</div>';
    html += '<div class="quiz-prompt">' + q.prompt + '</div>';

    if (q.choices) {
      html += '<div class="quiz-choices">';
      for (var i = 0; i < q.choices.length; i++) {
        html += '<button class="quiz-choice" data-answer="' + q.choices[i].toLowerCase().replace(/"/g, '&quot;') + '">' +
          String.fromCharCode(65 + i) + '. ' + q.choices[i] + '</button>';
      }
      html += '</div>';
      html += '<div class="quiz-hint">Click a button or type A, B, C, or D</div>';
    } else {
      html += '<div class="quiz-hint">Type your answer below</div>';
    }

    html += '</div>';
    return html;
  }

  function handleAnswer(answer) {
    if (!current || current.index >= current.questions.length) return null;

    var q = current.questions[current.index];
    var userAnswer = answer.trim().toLowerCase();
    var correct = false;

    // Handle letter choices (A, B, C, D)
    if (q.choices && userAnswer.length === 1 && userAnswer >= 'a' && userAnswer <= 'd') {
      var choiceIndex = userAnswer.charCodeAt(0) - 97;
      userAnswer = q.choices[choiceIndex] ? q.choices[choiceIndex].toLowerCase() : '';
    }

    // Check answer
    correct = userAnswer === q.answer;
    // Fuzzy match: allow without accents
    if (!correct) {
      var normalized = userAnswer.replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u').replace(/ñ/g, 'n');
      var normalizedAnswer = q.answer.replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u').replace(/ñ/g, 'n');
      correct = normalized === normalizedAnswer;
    }

    if (correct) current.score++;
    current.index++;

    var response = '';
    if (correct) {
      response = '<div class="quiz-result quiz-correct">✅ ¡Correcto! ' + pick(['¡Muy bien!', '¡Excelente!', '¡Perfecto!', '¡Fantástico!', '¡Genial!']) + '</div>';
    } else {
      response = '<div class="quiz-result quiz-incorrect">❌ Not quite. The answer was: <strong class="spanish-text">' + q.answer + '</strong></div>';
    }

    // If more questions, show next
    if (current.index < current.questions.length) {
      response += '\n\n' + formatQuestion();
      return { response: response, quizEnded: false };
    }

    // Quiz complete
    var pct = Math.round((current.score / current.total) * 100);
    response += '\n\n<div class="quiz-summary">';
    response += '<div class="quiz-summary-title">🎓 Quiz Complete!</div>';
    response += '<div class="quiz-summary-score">' + current.score + ' / ' + current.total + ' (' + pct + '%)</div>';

    if (pct === 100) {
      response += '<div class="quiz-summary-msg">¡Perfecto! A perfect score! You\'re a natural! 🌟</div>';
    } else if (pct >= 80) {
      response += '<div class="quiz-summary-msg">¡Muy bien! Excellent work! Keep it up! 🎯</div>';
    } else if (pct >= 60) {
      response += '<div class="quiz-summary-msg">¡Buen trabajo! You\'re on the right track. Keep practicing! 📚</div>';
    } else {
      response += '<div class="quiz-summary-msg">Don\'t give up! Practice makes perfect. Try studying the vocabulary and quiz again! 💪</div>';
    }
    response += '</div>';

    // Record progress
    if (typeof Progress !== 'undefined') {
      Progress.recordQuiz(current.score, current.total);
    }

    current = null;
    return { response: response, quizEnded: true };
  }

  function isActive() {
    return current !== null;
  }

  function cancel() {
    current = null;
    return '🛑 Quiz cancelled. No worries! Say <strong>"quiz me"</strong> whenever you want to try again!';
  }

  return {
    start: start,
    handleAnswer: handleAnswer,
    isActive: isActive,
    cancel: cancel,
    formatQuestion: formatQuestion
  };
})();
