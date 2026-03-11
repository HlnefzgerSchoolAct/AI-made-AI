// ============================================================
// Chat UI Module — renders messages, handles input, typing
// indicator, quick-action buttons, and quiz button clicks
// ============================================================
var ChatUI = (function () {
  'use strict';

  var HISTORY_KEY = 'profesor_chat_history';

  var elements = {};
  var history = [];
  var onSend = null;

  function init(sendCallback) {
    onSend = sendCallback;
    elements.container = document.getElementById('chat-messages');
    elements.input = document.getElementById('chat-input');
    elements.sendBtn = document.getElementById('chat-send');
    elements.quickActions = document.getElementById('quick-actions');
    elements.welcomeScreen = document.getElementById('welcome-screen');
    elements.inputArea = document.getElementById('chat-input-area');

    elements.sendBtn.addEventListener('click', handleSend);
    elements.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Enable/disable send button based on input content
    elements.input.addEventListener('input', function () {
      elements.sendBtn.disabled = !elements.input.value.trim();
      autoResizeInput();
    });

    // Delegate quiz choice button clicks
    elements.container.addEventListener('click', function (e) {
      var btn = e.target.closest('.quiz-choice');
      if (btn) {
        var answer = btn.getAttribute('data-answer');
        if (answer) submitQuizAnswer(answer);
      }
    });

    // Quick action buttons
    if (elements.quickActions) {
      elements.quickActions.addEventListener('click', function (e) {
        var btn = e.target.closest('.quick-btn');
        if (btn) {
          var action = btn.getAttribute('data-action');
          if (action) {
            elements.input.value = action;
            elements.sendBtn.disabled = false;
            handleSend();
          }
        }
      });
    }

    // Welcome card clicks
    if (elements.welcomeScreen) {
      elements.welcomeScreen.addEventListener('click', function (e) {
        var card = e.target.closest('.welcome-card');
        if (card) {
          var action = card.getAttribute('data-action');
          if (action) {
            elements.input.value = action;
            elements.sendBtn.disabled = false;
            handleSend();
          }
        }
      });
    }

    loadHistory();
  }

  function autoResizeInput() {
    var el = elements.input;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }

  function handleSend() {
    var text = elements.input.value.trim();
    if (!text) return;
    elements.input.value = '';
    elements.input.style.height = 'auto';
    elements.sendBtn.disabled = true;
    elements.input.focus();
    if (onSend) onSend(text);
  }

  function submitQuizAnswer(answer) {
    if (onSend) onSend(answer);
  }

  function showChatView() {
    if (elements.welcomeScreen) {
      elements.welcomeScreen.classList.add('hidden');
    }
    elements.container.classList.add('active');
  }

  function showWelcomeView() {
    if (elements.welcomeScreen) {
      elements.welcomeScreen.classList.remove('hidden');
    }
    elements.container.classList.remove('active');
  }

  function createMessageElement(role, html) {
    var wrapper = document.createElement('div');
    wrapper.className = 'message message-' + role;

    var inner = document.createElement('div');
    inner.className = 'message-inner';

    var avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'bot' ? 'P' : 'Y';

    var body = document.createElement('div');
    body.className = 'message-body';
    body.innerHTML = html;

    inner.appendChild(avatar);
    inner.appendChild(body);
    wrapper.appendChild(inner);
    return wrapper;
  }

  function addMessage(role, html) {
    showChatView();
    var wrapper = createMessageElement(role, html);
    elements.container.appendChild(wrapper);
    scrollToBottom();

    history.push({ role: role, html: html });
    saveHistory();
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'typing-indicator';
    el.id = 'typing-indicator';
    var inner = document.createElement('div');
    inner.className = 'message-inner';
    var avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.style.background = 'var(--accent)';
    avatar.style.color = 'var(--text-on-accent)';
    avatar.textContent = 'P';
    var dots = document.createElement('div');
    dots.className = 'typing-dots';
    dots.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    inner.appendChild(avatar);
    inner.appendChild(dots);
    el.appendChild(inner);
    elements.container.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    var el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    elements.container.scrollTop = elements.container.scrollHeight;
  }

  function clearChat() {
    elements.container.innerHTML = '';
    history = [];
    saveHistory();
    showWelcomeView();
  }

  function loadHistory() {
    try {
      var saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          history = parsed;
          showChatView();
          var start = Math.max(0, history.length - 30);
          for (var i = start; i < history.length; i++) {
            addMessageSilent(history[i].role, history[i].html);
          }
          scrollToBottom();
        }
      }
    } catch (e) { /* ignore */ }
  }

  function addMessageSilent(role, html) {
    var wrapper = createMessageElement(role, html);
    elements.container.appendChild(wrapper);
  }

  function saveHistory() {
    try {
      var toSave = history.slice(-50);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(toSave));
    } catch (e) { /* ignore */ }
  }

  function hasHistory() {
    return history.length > 0;
  }

  return {
    init: init,
    addMessage: addMessage,
    showTyping: showTyping,
    hideTyping: hideTyping,
    clearChat: clearChat,
    scrollToBottom: scrollToBottom,
    hasHistory: hasHistory,
    showChatView: showChatView,
    showWelcomeView: showWelcomeView
  };
})();
