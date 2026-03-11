// ============================================================
// Main Entry Point — wires all modules together, kicks off
// the chatbot, manages welcome screen + word of the day
// ============================================================
(function () {
  'use strict';

  function boot() {
    // 1. Initialize data modules
    Intents.init();
    Progress.load();
    if (typeof LearningPaths !== 'undefined') LearningPaths.load();
    if (typeof SRS !== 'undefined') {
      SRS.load();
      SRS.seedUnidad2A1();
    }
    if (typeof Context !== 'undefined') Context.reset();

    // 2. Initialize conversation engine
    Conversation.init();

    // 3. Initialize UI
    ChatUI.init(handleUserMessage);

    SidebarUI.init(function (actionText) {
      handleUserMessage(actionText);
    });

    // New-chat button (in sidebar)
    var newChatBtn = document.getElementById('new-chat-btn');
    if (newChatBtn) {
      newChatBtn.addEventListener('click', function () {
        ChatUI.clearChat();
        Conversation.reset();
        SidebarUI.closeSidebar();
      });
    }

    // Clear-chat button (in sidebar footer)
    var clearBtn = document.getElementById('clear-chat-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        ChatUI.clearChat();
        Conversation.reset();
      });
    }

    // 4. Update sidebar progress
    SidebarUI.updateProgress();
  }

  function handleUserMessage(text) {
    ChatUI.addMessage('user', escapeHtml(text));
    ChatUI.showTyping();

    var delay = 300 + Math.random() * 400;
    setTimeout(function () {
      Conversation.processInput(text).then(function (response) {
        ChatUI.hideTyping();
        response = (response || '').replace(/\n/g, '<br>');
        ChatUI.addMessage('bot', response);
        SidebarUI.updateProgress();
      }).catch(function () {
        ChatUI.hideTyping();
        ChatUI.addMessage('bot', 'Something went wrong. Please try again.');
      });
    }, delay);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
