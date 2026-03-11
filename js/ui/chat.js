// ============================================================
// Chat UI Module — renders messages, handles input, typing
// indicator, quick-action buttons, and quiz button clicks
// ============================================================
var ChatUI = (function () {
  'use strict';

  var HISTORY_KEY = 'profesor_chat_history';

  var elements = {};
  var history = [];
  var onSend = null; // callback(text)

  function init(sendCallback) {
    onSend = sendCallback;
    elements.container = document.getElementById('chat-messages');
    elements.input = document.getElementById('chat-input');
    elements.sendBtn = document.getElementById('chat-send');
    elements.quickActions = document.getElementById('quick-actions');

    elements.sendBtn.addEventListener('click', handleSend);
    elements.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Delegate quiz choice button clicks to the chat container
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
            handleSend();
          }
        }
      });
    }

    loadHistory();
  }

  function handleSend() {
    var text = elements.input.value.trim();
    if (!text) return;
    elements.input.value = '';
    elements.input.focus();
    if (onSend) onSend(text);
  }

  function submitQuizAnswer(answer) {
    if (onSend) onSend(answer);
  }

  function createMessageElement(role, html) {
    var wrapper = document.createElement('div');
    wrapper.className = 'message message-' + role;

    var avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'bot' ? '�🇸' : '🧑‍🎓';

    var bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = html;

    if (role === 'bot') {
      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
    } else {
      wrapper.appendChild(bubble);
      wrapper.appendChild(avatar);
    }
    return wrapper;
  }

  function addMessage(role, html) {
    // role: 'user' | 'bot'
    var wrapper = createMessageElement(role, html);
    elements.container.appendChild(wrapper);
    scrollToBottom();

    history.push({ role: role, html: html });
    saveHistory();
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'message message-bot typing-indicator';
    el.id = 'typing-indicator';
    el.innerHTML = '<div class="message-avatar">�🇸</div><div class="message-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
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
  }

  function loadHistory() {
    try {
      var saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        history = JSON.parse(saved);
        // Restore last 30 messages
        var start = Math.max(0, history.length - 30);
        for (var i = start; i < history.length; i++) {
          addMessageSilent(history[i].role, history[i].html);
        }
        scrollToBottom();
      }
    } catch (e) { /* ignore */ }
  }

  function addMessageSilent(role, html) {
    var wrapper = createMessageElement(role, html);
    elements.container.appendChild(wrapper);
  }

  function saveHistory() {
    try {
      // Keep last 50 messages
      var toSave = history.slice(-50);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(toSave));
    } catch (e) { /* ignore */ }
  }

  return {
    init: init,
    addMessage: addMessage,
    showTyping: showTyping,
    hideTyping: hideTyping,
    clearChat: clearChat,
    scrollToBottom: scrollToBottom
  };
})();
