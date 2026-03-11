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
    if (typeof SRS !== 'undefined') SRS.load();
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
    var welcomeHTML = '<strong>¡Bienvenido! Welcome to Spanish class!</strong> 🎓🇪🇸\n\n' +
      'I\'m <strong>Profesor</strong> — your personal AI Spanish tutor. I can help you with:\n\n' +
      '• 🔤 <strong>Translations</strong> — "How do you say dog in Spanish?"\n' +
      '• 📖 <strong>Conjugations</strong> — "Conjugate hablar in present tense"\n' +
      '• 📝 <strong>Grammar</strong> — "Explain ser vs estar"\n' +
      '• 📋 <strong>Vocabulary</strong> — "Teach me food vocabulary"\n' +
      '• 🧠 <strong>Quizzes</strong> — "Quiz me on colors"\n' +
      '• 💬 <strong>Phrases</strong> — "Restaurant phrases"\n' +
      '• 📚 <strong>Learning Path</strong> — "Show my learning path"\n' +
      '• 🃏 <strong>Flashcards</strong> — "Review flashcards"\n\n' +
      'Type anything below or use the sidebar to browse topics. ¡Vamos a aprender!';

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
