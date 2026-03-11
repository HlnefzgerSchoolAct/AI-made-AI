// ============================================================
// API Configuration — Server-proxied AI API settings
// Keys are stored server-side; the frontend hits the local
// /api/hackclub proxy endpoint.
// ============================================================
var APIConfig = (function () {
  'use strict';

  var config = {
    endpoint: '/api/hackclub',      // Hack Club AI
    model: 'gpt-4o-mini',
    maxTokens: 1024,
    temperature: 0.7,
    topP: 1,
    frequencyPenalty: 0.1,
    presencePenalty: 0.1,
    timeoutMs: 30000,
    maxRetries: 2,
    retryDelayMs: 1000
  };

  function isAvailable() {
    return true; // Server handles auth — always available from client perspective
  }

  function get(key) {
    return config.hasOwnProperty(key) ? config[key] : undefined;
  }

  function set(key, value) {
    if (config.hasOwnProperty(key)) {
      config[key] = value;
    }
  }

  function getAll() {
    var copy = {};
    for (var k in config) {
      if (config.hasOwnProperty(k)) copy[k] = config[k];
    }
    return copy;
  }

  return {
    isAvailable: isAvailable,
    get: get,
    set: set,
    getAll: getAll
  };
})();
