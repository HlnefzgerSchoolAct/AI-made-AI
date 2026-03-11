// ============================================================
// Sidebar UI Module — navigation, progress stats, settings
// ============================================================
var SidebarUI = (function () {
  'use strict';

  var elements = {};
  var onTopicSelect = null;

  function init(topicCallback) {
    onTopicSelect = topicCallback;
    elements.sidebar = document.getElementById('sidebar');
    elements.toggle = document.getElementById('sidebar-toggle');
    elements.overlay = document.getElementById('sidebar-overlay');
    elements.progressContainer = document.getElementById('sidebar-progress');
    elements.topicList = document.getElementById('sidebar-topics');
    elements.themeBtn = document.getElementById('theme-toggle');
    elements.clearBtn = document.getElementById('clear-chat-btn');
    elements.newChatBtn = document.getElementById('new-chat-btn');

    if (elements.toggle) {
      elements.toggle.addEventListener('click', toggleSidebar);
    }
    if (elements.overlay) {
      elements.overlay.addEventListener('click', closeSidebar);
    }
    if (elements.themeBtn) {
      elements.themeBtn.addEventListener('click', toggleTheme);
    }

    if (elements.topicList) {
      elements.topicList.addEventListener('click', function (e) {
        var btn = e.target.closest('.nav-item');
        if (btn) {
          var action = btn.getAttribute('data-action');
          if (action && onTopicSelect) {
            onTopicSelect(action);
            closeSidebar();
          }
        }
      });
    }

    buildTopics();
    loadTheme();
  }

  function buildTopics() {
    if (!elements.topicList) return;

    var sections = [
      {
        title: 'Vocabulary',
        items: [
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>', label: 'Unit 2A1 Vocab', action: 'teach me unidad 2a1 vocabulary' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', label: 'Bathroom Items', action: 'teach me bathroom vocab' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', label: 'Daily Routine Verbs', action: 'teach me daily routine vocabulary' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', label: 'Word of the Day', action: 'word of the day' }
        ]
      },
      {
        title: 'Grammar',
        items: [
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>', label: 'Reflexive Verb Rules', action: 'explain reflexive verbs' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>', label: 'Stem Changes', action: 'explain stem changing reflexives' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>', label: 'Pronoun Placement', action: 'explain reflexive pronoun placement' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>', label: 'Conjugate despertarse', action: 'conjugate despertarse' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>', label: 'Conjugate vestirse', action: 'conjugate vestirse' }
        ]
      },
      {
        title: 'Practice',
        items: [
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', label: 'Quiz Me', action: 'quiz me' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', label: 'Practice Conversation', action: 'practice conversation' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', label: 'Flashcard Review', action: 'review flashcards' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', label: 'Daily Challenge', action: 'daily challenge' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', label: 'Check My Spanish', action: 'correct my spanish' }
        ]
      },
      {
        title: 'Learn',
        items: [
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', label: 'My Lesson Progress', action: 'learning path' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', label: 'Analyze a Sentence', action: 'analyze my spanish' },
          { icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', label: 'Help', action: 'help' }
        ]
      }
    ];

    var html = '';
    for (var i = 0; i < sections.length; i++) {
      var sec = sections[i];
      html += '<div class="nav-section">';
      html += '<div class="nav-section-title">' + sec.title + '</div>';
      for (var j = 0; j < sec.items.length; j++) {
        var item = sec.items[j];
        html += '<button class="nav-item" data-action="' + item.action + '">' + item.icon + '<span>' + item.label + '</span></button>';
      }
      html += '</div>';
    }
    elements.topicList.innerHTML = html;
  }

  function updateProgress() {
    if (!elements.progressContainer) return;
    var html = '<div class="progress-compact">';

    if (typeof Progress !== 'undefined') {
      var stats = Progress.getStats();
      var level = stats.level || 1;
      var xp = stats.xp || 0;
      var nextLevelXp = level * 100;
      var xpPercent = Math.min(100, Math.round((xp % 100) / 100 * 100));

      html += '<div class="progress-row"><span class="progress-label">Level</span><span class="progress-value">' + level + '</span></div>';
      html += '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + xpPercent + '%"></div></div>';
      html += '<div class="progress-row"><span class="progress-label">XP</span><span class="progress-value">' + xp + ' / ' + nextLevelXp + '</span></div>';

      if (stats.streak) {
        html += '<div class="progress-row"><span class="progress-label">Streak</span><span class="progress-value">' + stats.streak + ' day' + (stats.streak !== 1 ? 's' : '') + '</span></div>';
      }
    }

    if (typeof LearningPaths !== 'undefined') {
      var lp = LearningPaths.getOverallProgress();
      html += '<div class="progress-row" style="margin-top:8px"><span class="progress-label">Lessons</span><span class="progress-value">' + lp.completed + '/' + lp.total + '</span></div>';
    }

    if (typeof SRS !== 'undefined') {
      var srsStats = SRS.getStats();
      html += '<div class="progress-row"><span class="progress-label">Cards due</span><span class="progress-value">' + srsStats.due + '</span></div>';
    }

    html += '</div>';
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

  function loadTheme() {
    var theme = localStorage.getItem('profesor_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('profesor_theme', next);
  }

  return {
    init: init,
    updateProgress: updateProgress,
    closeSidebar: closeSidebar
  };
})();
