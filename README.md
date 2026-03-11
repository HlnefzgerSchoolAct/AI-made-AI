# 🎓 Profesor — AI Spanish Tutor

A fully client-side AI Spanish professor chatbot built with **pure HTML, CSS, and JavaScript**. No server, no external APIs — everything runs in your browser.

## Features

- **🔤 Translation** — Translate words between English and Spanish (500+ word dictionary)
- **📖 Verb Conjugation** — Conjugate verbs across 6 tenses, including 28+ irregular verbs
- **📝 Grammar Lessons** — 12 grammar topics explained in detail (ser vs estar, por vs para, subjunctive, etc.)
- **📋 Vocabulary by Category** — 15+ categories: food, colors, animals, family, body, clothing, and more
- **🧠 Interactive Quizzes** — Multiple-choice and free-form quiz questions with scoring
- **💬 Situational Phrases** — Restaurant, shopping, directions, hotel, emergency, travel phrases
- **🌟 Word of the Day** — Daily vocabulary highlight
- **📊 Progress Tracking** — XP system, levels, streaks, quiz scores (saved in localStorage)
- **🌗 Dark/Light Theme** — Toggle between themes
- **📱 Responsive Design** — Works on desktop and mobile

## How to Use

1. Open `index.html` in any modern browser (works from `file://`)
2. Type a question or use the quick-action buttons / sidebar topics
3. Your progress and chat history are saved automatically

## Architecture

```
index.html              — Entry point
css/styles.css          — Professor-themed UI with Spanish flag colors
js/
  nlp/
    tokenizer.js        — Tokenize, normalize, stem user input
    classifier.js       — Bag-of-words intent classifier (cosine similarity)
    entities.js         — Extract verbs, words, tenses, topics from text
  spanish/
    dictionary.js       — 500+ word EN↔ES dictionary (15 categories)
    conjugation.js      — Full conjugation engine (6 tenses, 28+ irregulars)
    grammar.js          — 12 grammar rule topics with examples
    phrases.js          — 10 situational phrase categories
  knowledge/
    intents.js          — 25+ intent definitions with training patterns
    responses.js        — Response generators with professor personality
  quiz/
    quiz.js             — Quiz engine (vocab + conjugation questions)
    progress.js         — XP, levels, streaks, stats tracker
  ui/
    chat.js             — Chat rendering, input handling, typing indicator
    sidebar.js          — Topic browser, progress display, theme toggle
  conversation.js       — Orchestrates NLP pipeline → response generation
  main.js               — Boots everything, welcome message
```

## Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — Zero dependencies, no build step
- **IIFE pattern** — Each module is a self-contained namespace
- **localStorage** — Persists chat history, quiz scores, progress, settings
- **Custom NLP** — Tokenizer → bag-of-words classifier → entity extractor (all client-side)