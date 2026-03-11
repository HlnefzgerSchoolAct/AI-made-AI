// ============================================================
// Sidebar UI Module — topic browser, quiz launcher, progress
// stats, settings panel, and mobile toggle
// ============================================================
var SidebarUI = (function () {
  'use strict';

  var elements = {};
  var onTopicSelect = null; // callback(text)

  function init(topicCallback) {
    onTopicSelect = topicCallback;
    elements.sidebar = document.getElementById('sidebar');
    elements.toggle = document.getElementById('sidebar-toggle');
    elements.overlay = document.getElementById('sidebar-overlay');
    elements.progressContainer = document.getElementById('sidebar-progress');
    elements.topicList = document.getElementById('sidebar-topics');
    elements.themeBtn = document.getElementById('theme-toggle');
    elements.clearBtn = document.getElementById('clear-chat-btn');

    // Toggle sidebar on mobile
    if (elements.toggle) {
      elements.toggle.addEventListener('click', toggleSidebar);
    }
    if (elements.overlay) {
      elements.overlay.addEventListener('click', closeSidebar);
    }

    // Theme toggle
    if (elements.themeBtn) {
      elements.themeBtn.addEventListener('click', toggleTheme);
    }

    // Topic list delegation
    if (elements.topicList) {
      elements.topicList.addEventListener('click', function (e) {
        var btn = e.target.closest('.topic-btn');
        if (btn) {
          var action = btn.getAttribute('data-action');
          if (action && onTopicSelect) {
            onTopicSelect(action);
            closeSidebar();
          }
        }
      });
    }

    // Build topic list
    buildTopics();
    // Load theme
    loadTheme();
  }

  function buildTopics() {
    if (!elements.topicList) return;

    var sections = [
      {
        title: '� Unidad 2A1 Vocabulary',
        items: [
          { label: 'All Unit Vocab', action: 'teach me unidad 2a1 vocabulary' },
          { label: 'Bathroom Items', action: 'teach me bathroom vocab' },
          { label: 'Daily Routine Verbs', action: 'teach me daily routine vocabulary' },
          { label: 'Word of the Day', action: 'word of the day' }
        ]
      },
      {
        title: '📖 Reflexive Verbs',
        items: [
          { label: 'Reflexive Verb Rules', action: 'explain reflexive verbs' },
          { label: 'Stem Changes (e→ie, e→i)', action: 'explain stem changing reflexives' },
          { label: 'Pronoun Placement', action: 'explain reflexive pronoun placement' },
          { label: 'Conjugate despertarse', action: 'conjugate despertarse' },
          { label: 'Conjugate vestirse', action: 'conjugate vestirse' }
        ]
      },
      {
        title: '🎯 Practice',
        items: [
          { label: '🧠 Quiz Me (2A1)', action: 'quiz me' },
          { label: '💬 Practice Conversation', action: 'practice conversation' },
          { label: '🃏 Flashcard Review', action: 'review flashcards' },
          { label: '🏆 Daily Challenge', action: 'daily challenge' },
          { label: '✏️ Check My Spanish', action: 'correct my spanish' }
        ]
      },
      {
        title: '📚 Learning',
        items: [
          { label: '📚 My Lesson Progress', action: 'learning path' },
          { label: '🔍 Analyze a Sentence', action: 'analyze my spanish' },
          { label: '❓ Help', action: 'help' }
        ]
      }
    ];

    var html = '';
    for (var i = 0; i < sections.length; i++) {
      var sec = sections[i];
      html += '<div class="topic-section">';
      html += '<div class="topic-section-title">' + sec.title + '</div>';
      for (var j = 0; j < sec.items.length; j++) {
        var item = sec.items[j];
        html += '<button class="topic-btn" data-action="' + item.action + '">' + item.label + '</button>';
      }
      html += '</div>';
    }
    elements.topicList.innerHTML = html;
  }

  function updateProgress() {
    if (!elements.progressContainer) return;
    var html = '';

    // Core progress stats
    if (typeof Progress !== 'undefined') {
      html += Progress.formatStats();
    }

    // Learning path progress
    if (typeof LearningPaths !== 'undefined') {
      var lp = LearningPaths.getOverallProgress();
      html += '<div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border-color)">';
      html += '<div style="font-size:0.78em;color:var(--text-muted);margin-bottom:4px">📚 Learning Path</div>';
      html += '<div class="progress-stats"><div class="stat-item"><span class="stat-icon">📖</span><span class="stat-label">Lessons</span><span class="stat-value">' + lp.completed + '/' + lp.total + '</span></div>';
      html += '<div class="stat-item"><span class="stat-icon">🏅</span><span class="stat-label">Level</span><span class="stat-value">' + (lp.currentLevel || 'A1') + '</span></div></div>';
      html += '<div class="xp-bar-container"><div class="xp-bar" style="width:' + lp.percent + '%"></div></div>';
      html += '<div class="xp-label">' + lp.percent + '% complete</div>';
      html += '</div>';
    }

    // SRS flashcard stats
    if (typeof SRS !== 'undefined') {
      var srsStats = SRS.getStats();
      html += '<div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border-color)">';
      html += '<div style="font-size:0.78em;color:var(--text-muted);margin-bottom:4px">🃏 Flashcards</div>';
      html += '<div class="progress-stats"><div class="stat-item"><span class="stat-icon">📇</span><span class="stat-label">Cards</span><span class="stat-value">' + srsStats.total + '</span></div>';
      html += '<div class="stat-item"><span class="stat-icon">🔔</span><span class="stat-label">Due</span><span class="stat-value">' + srsStats.due + '</span></div></div>';
      html += '</div>';
    }

    elements.progressContainer.innerHTML = html;
  }

  function toggleSidebar() {
    elements.sidebar.classList.toggle('open');
    if (elements.overlay) elements.overlay.classList.toggle('visible');
  }

  function closeSidebar() {
    elements.sidebar.classList.remove('open');
    if (elements.overlay) elements.overlay.classList.remove('visible');
  }

  // ---- Dark/Light Theme ----
  function loadTheme() {
    var theme = localStorage.getItem('profesor_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeBtn(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('profesor_theme', next);
    updateThemeBtn(next);
  }

  function updateThemeBtn(theme) {
    if (elements.themeBtn) {
      elements.themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      elements.themeBtn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }

  return {
    init: init,
    updateProgress: updateProgress,
    closeSidebar: closeSidebar
  };
})();
