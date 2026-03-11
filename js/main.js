// ============================================================
// Main Entry Point — wires all modules together, kicks off
// the chatbot, displays welcome message + word of the day
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

    // Clear-chat button
    var clearBtn = document.getElementById('clear-chat-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        ChatUI.clearChat();
        Conversation.reset();
        showWelcome();
      });
    }

    // 4. Show welcome message if no history
    var saved = localStorage.getItem('profesor_chat_history');
    if (!saved || JSON.parse(saved).length === 0) {
      showWelcome();
    }

    // 5. Update sidebar progress
    SidebarUI.updateProgress();
  }

  function showWelcome() {
    var welcomeHTML = '<strong>¡Bienvenido a 3rd Hour Spanish!</strong> 🇪🇸\n\n' +
      'I\'m your study assistant for <strong>Unidad 2A1 — La rutina diaria</strong> (¡Qué Chévere! Level 2).\n\n' +
      'Here\'s what you can do:\n\n' +
      '• 🧠 <strong>"Quiz me"</strong> — Test your Unidad 2A1 vocabulary\n' +
      '• 📋 <strong>"Vocab list"</strong> — See all 27 unit words\n' +
      '• 📝 <strong>"Reflexive verbs"</strong> — Learn the grammar\n' +
      '• 💬 <strong>"Practice conversation"</strong> — Daily routine dialogue\n' +
      '• 🃏 <strong>"Flashcards"</strong> — Spaced repetition review\n' +
      '• 📚 <strong>"Learning path"</strong> — Track your lesson progress\n\n' +
      'Type below or use the sidebar to get started. ¡Vamos a estudiar! 💪';

    ChatUI.addMessage('bot', welcomeHTML.replace(/\n/g, '<br>'));

    // Word of the day
    setTimeout(function () {
      var wod = Responses.generateWordOfDay();
      ChatUI.addMessage('bot', wod.replace(/\n/g, '<br>'));
    }, 800);
  }

  function handleUserMessage(text) {
    // Show user message
    ChatUI.addMessage('user', escapeHtml(text));

    // Show typing indicator
    ChatUI.showTyping();

    // Simulate short "thinking" delay for natural feel
    var delay = 300 + Math.random() * 400;
    setTimeout(function () {
      // processInput always returns a Promise now (API-backed)
      Conversation.processInput(text).then(function (response) {
        ChatUI.hideTyping();
        response = (response || '').replace(/\n/g, '<br>');
        ChatUI.addMessage('bot', response);
        SidebarUI.updateProgress();
      }).catch(function () {
        ChatUI.hideTyping();
        ChatUI.addMessage('bot', 'Sorry, something went wrong. Please try again! 😊');
      });
    }, delay);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
