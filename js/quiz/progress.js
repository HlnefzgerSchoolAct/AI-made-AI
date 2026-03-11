// ============================================================
// Progress Tracker — tracks words learned, quizzes taken,
// streaks, and levels.  Persisted to localStorage.
// ============================================================
var Progress = (function () {
  'use strict';

  var STORAGE_KEY = 'profesor_progress';

  var data = {
    wordsLearned: [],       // unique words the user has looked up
    quizzesTaken: 0,
    quizScoreTotal: 0,
    quizQuestionsTotal: 0,
    streak: 0,              // consecutive days
    lastActiveDate: null,
    lessonsCompleted: 0,
    level: 1,
    xp: 0
  };

  function load() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        for (var key in parsed) {
          if (data.hasOwnProperty(key)) data[key] = parsed[key];
        }
      }
    } catch (e) { /* ignore */ }
    updateStreak();
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* ignore */ }
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function updateStreak() {
    var today = todayStr();
    if (!data.lastActiveDate) {
      data.streak = 1;
    } else if (data.lastActiveDate === today) {
      // same day, keep streak
    } else {
      var last = new Date(data.lastActiveDate);
      var now = new Date(today);
      var diff = Math.floor((now - last) / 86400000);
      if (diff === 1) {
        data.streak++;
      } else if (diff > 1) {
        data.streak = 1;
      }
    }
    data.lastActiveDate = today;
    save();
  }

  function addXP(amount) {
    data.xp += amount;
    // Level up every 100 XP
    while (data.xp >= data.level * 100) {
      data.xp -= data.level * 100;
      data.level++;
    }
    save();
  }

  function addWord(word) {
    word = word.toLowerCase();
    if (data.wordsLearned.indexOf(word) === -1) {
      data.wordsLearned.push(word);
      addXP(5);
    }
    save();
  }

  function recordQuiz(score, total) {
    data.quizzesTaken++;
    data.quizScoreTotal += score;
    data.quizQuestionsTotal += total;
    addXP(score * 10);
    save();
  }

  function recordLesson() {
    data.lessonsCompleted++;
    addXP(15);
    save();
  }

  function getStats() {
    var avgScore = data.quizQuestionsTotal > 0
      ? Math.round((data.quizScoreTotal / data.quizQuestionsTotal) * 100)
      : 0;
    return {
      wordsLearned: data.wordsLearned.length,
      quizzesTaken: data.quizzesTaken,
      averageScore: avgScore,
      streak: data.streak,
      lessonsCompleted: data.lessonsCompleted,
      level: data.level,
      xp: data.xp,
      xpToNext: data.level * 100
    };
  }

  function formatStats() {
    var s = getStats();
    var html = '<div class="progress-stats">';
    html += '<div class="stat-item"><span class="stat-icon">🎓</span><span class="stat-label">Level</span><span class="stat-value">' + s.level + '</span></div>';
    html += '<div class="stat-item"><span class="stat-icon">⭐</span><span class="stat-label">XP</span><span class="stat-value">' + s.xp + ' / ' + s.xpToNext + '</span></div>';
    html += '<div class="stat-item"><span class="stat-icon">🔥</span><span class="stat-label">Streak</span><span class="stat-value">' + s.streak + ' day' + (s.streak !== 1 ? 's' : '') + '</span></div>';
    html += '<div class="stat-item"><span class="stat-icon">📖</span><span class="stat-label">Words</span><span class="stat-value">' + s.wordsLearned + '</span></div>';
    html += '<div class="stat-item"><span class="stat-icon">🧠</span><span class="stat-label">Quizzes</span><span class="stat-value">' + s.quizzesTaken + '</span></div>';
    html += '<div class="stat-item"><span class="stat-icon">📊</span><span class="stat-label">Avg Score</span><span class="stat-value">' + s.averageScore + '%</span></div>';
    html += '</div>';

    // XP bar
    var pct = s.xpToNext > 0 ? Math.round((s.xp / s.xpToNext) * 100) : 0;
    html += '<div class="xp-bar-container">';
    html += '<div class="xp-bar" style="width:' + pct + '%"></div>';
    html += '</div>';
    html += '<div class="xp-label">' + s.xp + ' / ' + s.xpToNext + ' XP to Level ' + (s.level + 1) + '</div>';

    return html;
  }

  function resetProgress() {
    data = {
      wordsLearned: [],
      quizzesTaken: 0,
      quizScoreTotal: 0,
      quizQuestionsTotal: 0,
      streak: 0,
      lastActiveDate: null,
      lessonsCompleted: 0,
      level: 1,
      xp: 0
    };
    save();
  }

  return {
    load: load,
    addWord: addWord,
    recordQuiz: recordQuiz,
    recordLesson: recordLesson,
    getStats: getStats,
    formatStats: formatStats,
    resetProgress: resetProgress
  };
})();
