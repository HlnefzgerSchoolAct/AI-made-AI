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
        title: '📚 Vocabulary',
        items: [
          { label: 'Food & Drink', action: 'teach me food vocabulary' },
          { label: 'Colors', action: 'teach me colors' },
          { label: 'Numbers', action: 'teach me numbers' },
          { label: 'Animals', action: 'teach me animal words' },
          { label: 'Family', action: 'teach me family vocabulary' },
          { label: 'Body Parts', action: 'teach me body vocabulary' },
          { label: 'Clothing', action: 'teach me clothing vocabulary' },
          { label: 'Weather', action: 'teach me weather words' },
          { label: 'Emotions', action: 'teach me emotions vocabulary' }
        ]
      },
      {
        title: '📖 Grammar',
        items: [
          { label: 'Ser vs Estar', action: 'explain ser vs estar' },
          { label: 'Por vs Para', action: 'explain por vs para' },
          { label: 'Gender & Articles', action: 'explain gender in spanish' },
          { label: 'Adjectives', action: 'explain adjectives' },
          { label: 'Pronouns', action: 'explain pronouns' },
          { label: 'Subjunctive', action: 'explain subjunctive' },
          { label: 'Preterite vs Imperfect', action: 'explain preterite vs imperfect' }
        ]
      },
      {
        title: '🔄 Conjugation',
        items: [
          { label: 'Ser (to be)', action: 'conjugate ser' },
          { label: 'Estar (to be)', action: 'conjugate estar' },
          { label: 'Tener (to have)', action: 'conjugate tener' },
          { label: 'Ir (to go)', action: 'conjugate ir' },
          { label: 'Hacer (to do)', action: 'conjugate hacer' },
          { label: 'Hablar (to speak)', action: 'conjugate hablar' }
        ]
      },
      {
        title: '💬 Phrases',
        items: [
          { label: 'Restaurant', action: 'restaurant phrases' },
          { label: 'Shopping', action: 'shopping phrases' },
          { label: 'Directions', action: 'direction phrases' },
          { label: 'Hotel', action: 'hotel phrases' },
          { label: 'Emergency', action: 'emergency phrases' },
          { label: 'Travel', action: 'travel phrases' }
        ]
      },
      {
        title: '🎯 Practice',
        items: [
          { label: '🧠 Start a Quiz', action: 'quiz me' },
          { label: '💬 Practice Dialogue', action: 'practice conversation' },
          { label: '🌟 Word of the Day', action: 'word of the day' },
          { label: '🌎 Cultural Facts', action: 'tell me about spanish culture' },
          { label: '🔤 Alphabet & Sounds', action: 'teach me the spanish alphabet' },
          { label: '🗣️ Learn an Idiom', action: 'teach me an idiom' },
          { label: '🏆 Daily Challenge', action: 'daily challenge' }
        ]
      },
      {
        title: '📚 Learning',
        items: [
          { label: '📚 My Learning Path', action: 'learning path' },
          { label: '🃏 Review Flashcards', action: 'review flashcards' },
          { label: '🔍 Analyze a Sentence', action: 'analyze my spanish' }
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
