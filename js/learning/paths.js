// ============================================================
// CEFR Learning Paths — structured curriculum A1 → B2
// ============================================================
var LearningPaths = (function () {
  'use strict';

  var STORAGE_KEY = 'profesor_learning_paths';

  // ── Progress Data ──────────────────────────────────────────
  var progress = {};  // { levelId_lessonId: { completed: bool, score: number, timestamp } }

  // ── Level Definitions ──────────────────────────────────────
  var levels = [
    {
      id: '2A1',
      name: 'Unidad 2A1 — La rutina diaria',
      description: '¡Qué Chévere! Level 2 — Daily routines, reflexive verbs, and bathroom vocabulary.',
      color: '#e74c3c',
      icon: '🇪🇸',
      lessons: [
        {
          id: '2A1_01',
          title: 'Vocabulario del baño — Bathroom Vocabulary',
          description: 'Learn the bathroom items from Unidad 2A1.',
          objectives: ['Name bathroom items in Spanish', 'Use articles correctly with new vocab', 'Describe what you see in a bathroom'],
          vocabulary: ['el cepillo', 'el champú', 'la crema de afeitar', 'el desodorante', 'la ducha', 'el espejo', 'el grifo', 'el inodoro', 'el jabón', 'el lavabo', 'el maquillaje', 'el peine', 'el pelo', 'la tina', 'la toalla'],
          grammarPoint: 'Most bathroom items are masculine (el cepillo, el jabón). Key feminine nouns: la ducha, la crema de afeitar, la tina, la toalla.',
          practicePrompt: 'Describe what you see in your bathroom using the vocabulary words.',
          requiredScore: 70
        },
        {
          id: '2A1_02',
          title: 'Verbos reflexivos — Reflexive Verbs',
          description: 'Master the daily routine reflexive verbs from the unit.',
          objectives: ['Conjugate reflexive verbs in present tense', 'Use reflexive pronouns correctly', 'Describe daily routine actions'],
          vocabulary: ['bañarse', 'cepillarse', 'ducharse', 'lavarse', 'levantarse', 'maquillarse', 'peinarse', 'ponerse', 'quitarse'],
          grammarPoint: 'Reflexive pronouns (me, te, se, nos, se) go before the conjugated verb: Me lavo las manos. They can also attach to infinitives: Voy a lavarme.',
          practicePrompt: 'Write 5 sentences describing your morning routine using different reflexive verbs.',
          requiredScore: 70
        },
        {
          id: '2A1_03',
          title: 'Cambios de raíz — Stem-Changing Reflexives',
          description: 'Focus on despertarse (e→ie) and vestirse (e→i).',
          objectives: ['Conjugate despertarse with e→ie stem change', 'Conjugate vestirse with e→i stem change', 'Remember that nosotros does NOT stem-change'],
          vocabulary: ['despertarse', 'vestirse', 'me despierto', 'te despiertas', 'se despierta', 'nos despertamos', 'me visto', 'te vistes', 'se viste', 'nos vestimos'],
          grammarPoint: 'Despertarse (e→ie): me despierto, te despiertas, se despierta, nos despertamos, se despiertan. Vestirse (e→i): me visto, te vistes, se viste, nos vestimos, se visten. Nosotros/vosotros do NOT change.',
          practicePrompt: 'Conjugate despertarse and vestirse for all persons. Then use each in a sentence.',
          requiredScore: 70
        },
        {
          id: '2A1_04',
          title: 'Mi rutina diaria — My Daily Routine',
          description: 'Put it all together: describe a full daily routine.',
          objectives: ['Describe a complete morning routine', 'Use time expressions with routine verbs', 'Sequence events with primero, luego, después, finalmente'],
          vocabulary: ['tarde', 'primero', 'luego', 'después', 'finalmente', 'por la mañana', 'por la noche', 'todos los días', 'a las siete', 'temprano'],
          grammarPoint: 'Sequencing words: Primero me despierto. Luego me ducho. Después me visto. Finalmente me peino. Use "a las + time" to say when: Me levanto a las siete.',
          practicePrompt: 'Describe your complete morning routine from waking up to leaving your house. Use time expressions and sequencing words.',
          requiredScore: 70
        },
        {
          id: '2A1_05',
          title: 'Repaso completo — Full Unit Review',
          description: 'Review all vocabulary, grammar, and conversation skills from Unidad 2A1.',
          objectives: ['Translate all 27 vocabulary words', 'Conjugate all reflexive verbs correctly', 'Hold a conversation about daily routines'],
          vocabulary: ['bañarse', 'cepillarse', 'el cepillo', 'el champú', 'la crema de afeitar', 'el desodorante', 'despertarse', 'la ducha', 'ducharse', 'el espejo', 'el grifo', 'el inodoro', 'el jabón', 'el lavabo', 'lavarse', 'levantarse', 'el maquillaje', 'maquillarse', 'peinarse', 'el peine', 'el pelo', 'ponerse', 'quitarse', 'tarde', 'la tina', 'la toalla', 'vestirse'],
          grammarPoint: 'Review: reflexive pronoun placement (before conjugated verb OR attached to infinitive/gerund), stem changes for despertarse and vestirse, bathroom vocabulary with correct articles.',
          practicePrompt: 'Take the full Unidad 2A1 quiz to test everything you\'ve learned!',
          requiredScore: 80
        }
      ]
    }
  ];

  // ── Initialization ─────────────────────────────────────────
  function load() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        progress = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LearningPaths: Could not load progress', e);
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LearningPaths: Could not save progress', e);
    }
  }

  // ── Core Functions ─────────────────────────────────────────

  /**
   * Get all available levels.
   */
  function getLevels() {
    return levels.map(function (level) {
      var completed = 0;
      for (var i = 0; i < level.lessons.length; i++) {
        if (progress[level.lessons[i].id] && progress[level.lessons[i].id].completed) {
          completed++;
        }
      }
      return {
        id: level.id,
        name: level.name,
        description: level.description,
        color: level.color,
        icon: level.icon,
        totalLessons: level.lessons.length,
        completedLessons: completed,
        percentComplete: Math.round((completed / level.lessons.length) * 100)
      };
    });
  }

  /**
   * Get a specific level with full lesson details.
   */
  function getLevel(levelId) {
    for (var i = 0; i < levels.length; i++) {
      if (levels[i].id === levelId) return levels[i];
    }
    return null;
  }

  /**
   * Get a specific lesson.
   */
  function getLesson(lessonId) {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        if (levels[i].lessons[j].id === lessonId) {
          return levels[i].lessons[j];
        }
      }
    }
    return null;
  }

  /**
   * Get the current (next uncompleted) lesson.
   */
  function getCurrentLesson() {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        var lesson = levels[i].lessons[j];
        if (!progress[lesson.id] || !progress[lesson.id].completed) {
          return { level: levels[i], lesson: lesson, levelIndex: i, lessonIndex: j };
        }
      }
    }
    return null; // All complete
  }

  /**
   * Mark a lesson as completed.
   */
  function completeLesson(lessonId, score) {
    progress[lessonId] = {
      completed: score >= 70,
      score: score,
      timestamp: Date.now(),
      attempts: (progress[lessonId] ? progress[lessonId].attempts || 0 : 0) + 1
    };
    save();
    return progress[lessonId];
  }

  /**
   * Check if a lesson is unlocked (previous lesson completed or first lesson).
   */
  function isLessonUnlocked(lessonId) {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        if (levels[i].lessons[j].id === lessonId) {
          if (j === 0) {
            // First lesson of level: check if previous level is complete (or first level)
            if (i === 0) return true;
            var prevLevel = levels[i - 1];
            var prevCompleted = 0;
            for (var k = 0; k < prevLevel.lessons.length; k++) {
              if (progress[prevLevel.lessons[k].id] && progress[prevLevel.lessons[k].id].completed) {
                prevCompleted++;
              }
            }
            return prevCompleted >= Math.floor(prevLevel.lessons.length * 0.7); // 70% of previous level
          }
          // Not first lesson: check previous lesson
          var prevLesson = levels[i].lessons[j - 1];
          return progress[prevLesson.id] && progress[prevLesson.id].completed;
        }
      }
    }
    return false;
  }

  /**
   * Get overall progress stats.
   */
  function getOverallProgress() {
    var totalLessons = 0;
    var completedLessons = 0;
    var totalScore = 0;
    var scoredLessons = 0;

    for (var i = 0; i < levels.length; i++) {
      totalLessons += levels[i].lessons.length;
      for (var j = 0; j < levels[i].lessons.length; j++) {
        var p = progress[levels[i].lessons[j].id];
        if (p && p.completed) {
          completedLessons++;
          totalScore += p.score;
          scoredLessons++;
        }
      }
    }

    return {
      totalLessons: totalLessons,
      completedLessons: completedLessons,
      percentComplete: Math.round((completedLessons / totalLessons) * 100),
      averageScore: scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0,
      currentLevel: _getCurrentLevelId()
    };
  }

  // ── Formatting ─────────────────────────────────────────────

  /**
   * Format all levels as an overview HTML.
   */
  function formatLevelsOverview() {
    var levelData = getLevels();
    var html = '<div class="learning-path-overview">';
    html += '<div class="path-title">📚 3rd Hour Spanish — Unidad 2A1 Lessons</div>';

    for (var i = 0; i < levelData.length; i++) {
      var l = levelData[i];
      var statusClass = l.percentComplete === 100 ? 'level-complete' :
        l.completedLessons > 0 ? 'level-active' : 'level-locked';
      html += '<div class="level-card ' + statusClass + '" style="border-left: 4px solid ' + l.color + '">';
      html += '<div class="level-header">';
      html += '<span class="level-icon">' + l.icon + '</span> ';
      html += '<strong>' + l.name + '</strong>';
      html += '<span class="level-progress">' + l.completedLessons + '/' + l.totalLessons + '</span>';
      html += '</div>';
      html += '<div class="level-desc">' + l.description + '</div>';
      html += '<div class="level-bar"><div class="level-bar-fill" style="width:' + l.percentComplete + '%;background:' + l.color + '"></div></div>';
      html += '</div>';
    }

    var current = getCurrentLesson();
    if (current) {
      html += '<div class="path-next">📍 <strong>Next:</strong> ' + current.lesson.title + ' (' + current.level.name + ')</div>';
      html += '<p>Type <strong>"start lesson"</strong> to begin!</p>';
    } else {
      html += '<div class="path-complete">🎉 Congratulations! You\'ve completed all lessons!</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Format a single lesson overview.
   */
  function formatLessonOverview(lesson) {
    if (!lesson) return '<p>Lesson not found.</p>';

    var p = progress[lesson.id];
    var html = '<div class="lesson-overview">';
    html += '<div class="lesson-title">📖 ' + lesson.title + '</div>';
    html += '<p>' + lesson.description + '</p>';

    // Objectives
    html += '<div class="lesson-section"><strong>🎯 Objectives:</strong><ul>';
    for (var i = 0; i < lesson.objectives.length; i++) {
      html += '<li>' + lesson.objectives[i] + '</li>';
    }
    html += '</ul></div>';

    // Key vocabulary
    html += '<div class="lesson-section"><strong>📝 Key Vocabulary:</strong> ';
    html += '<span class="spanish-text">' + lesson.vocabulary.join(', ') + '</span>';
    html += '</div>';

    // Grammar point
    html += '<div class="lesson-section"><strong>📐 Grammar Focus:</strong> ' + lesson.grammarPoint + '</div>';

    // Practice prompt
    html += '<div class="lesson-section"><strong>✍️ Practice:</strong> ' + lesson.practicePrompt + '</div>';

    // Status
    if (p && p.completed) {
      html += '<div class="lesson-status lesson-passed">✅ Completed — Score: ' + p.score + '%</div>';
    } else if (p) {
      html += '<div class="lesson-status lesson-attempted">⏳ Attempted — Best score: ' + p.score + '% (need 70%)</div>';
    } else {
      html += '<div class="lesson-status lesson-new">🆕 Not started yet</div>';
    }

    html += '</div>';
    return html;
  }

  // ── Private Helpers ────────────────────────────────────────

  function _getCurrentLevelId() {
    for (var i = 0; i < levels.length; i++) {
      for (var j = 0; j < levels[i].lessons.length; j++) {
        if (!progress[levels[i].lessons[j].id] || !progress[levels[i].lessons[j].id].completed) {
          return levels[i].id;
        }
      }
    }
    return 'B2'; // All complete
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    load: load,
    save: save,
    getLevels: getLevels,
    getLevel: getLevel,
    getLesson: getLesson,
    getCurrentLesson: getCurrentLesson,
    completeLesson: completeLesson,
    isLessonUnlocked: isLessonUnlocked,
    getOverallProgress: getOverallProgress,
    formatLevelsOverview: formatLevelsOverview,
    formatLessonOverview: formatLessonOverview
  };
})();
