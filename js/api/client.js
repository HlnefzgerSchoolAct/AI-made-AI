// ============================================================
// API Client — Sends requests to /api/hackclub server proxy
// with retry logic, error handling, and request management.
// ============================================================
var APIClient = (function () {
  'use strict';

  // ---- Active request tracking ----
  var _activeController = null;
  var _requestCount = 0;
  var _errorLog = [];

  // ---- Error types ----
  var ERROR = {
    NETWORK: 'NETWORK_ERROR',
    TIMEOUT: 'TIMEOUT_ERROR',
    AUTH: 'AUTH_ERROR',
    RATE_LIMIT: 'RATE_LIMIT_ERROR',
    SERVER: 'SERVER_ERROR',
    PARSE: 'PARSE_ERROR',
    ABORTED: 'ABORTED',
    UNKNOWN: 'UNKNOWN_ERROR'
  };

  // ---- Helpers ----
  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function logError(err) {
    _errorLog.push({
      time: new Date().toISOString(),
      type: err.type || ERROR.UNKNOWN,
      message: err.message || 'Unknown error',
      status: err.status || null
    });
    if (_errorLog.length > 50) {
      _errorLog = _errorLog.slice(-50);
    }
  }

  function classifyError(status) {
    if (status === 401 || status === 403) return ERROR.AUTH;
    if (status === 429) return ERROR.RATE_LIMIT;
    if (status >= 500) return ERROR.SERVER;
    if (status >= 400) return ERROR.UNKNOWN;
    return ERROR.UNKNOWN;
  }

  /**
   * Build the request body sent to the proxy endpoint.
   */
  function buildRequestBody(messages, options) {
    options = options || {};
    return {
      messages: messages,
      model: options.model || APIConfig.get('model'),
      max_tokens: options.maxTokens || APIConfig.get('maxTokens'),
      temperature: options.temperature !== undefined ? options.temperature : APIConfig.get('temperature')
    };
  }

  /**
   * Core request function with retry logic.
   */
  function attemptRequest(endpoint, body, timeout, retriesLeft, retryDelay) {
    _requestCount++;

    var controller = new AbortController();
    _activeController = controller;
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, timeout);

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    })
    .then(function (response) {
      clearTimeout(timeoutId);

      if (!response.ok) {
        return response.text().then(function (text) {
          var errorType = classifyError(response.status);
          var err = {
            type: errorType,
            message: 'API returned status ' + response.status + ': ' + text.substring(0, 200),
            status: response.status
          };
          logError(err);

          if (retriesLeft > 0 && (errorType === ERROR.SERVER || errorType === ERROR.RATE_LIMIT)) {
            var delay = errorType === ERROR.RATE_LIMIT ? retryDelay * 3 : retryDelay;
            return sleep(delay).then(function () {
              return attemptRequest(endpoint, body, timeout, retriesLeft - 1, retryDelay * 2);
            });
          }
          return Promise.reject(err);
        });
      }

      return response.json();
    })
    .then(function (data) {
      _activeController = null;
      if (data && data.choices && data.choices.length > 0) {
        var choice = data.choices[0];
        return (choice.message ? choice.message.content : '') || '';
      }
      return '';
    })
    .catch(function (err) {
      clearTimeout(timeoutId);
      _activeController = null;

      if (err && err.type) {
        return Promise.reject(err);
      }

      if (err.name === 'AbortError') {
        var abortErr = { type: ERROR.TIMEOUT, message: 'Request timed out after ' + timeout + 'ms' };
        logError(abortErr);
        if (retriesLeft > 0) {
          return sleep(retryDelay).then(function () {
            return attemptRequest(endpoint, body, timeout, retriesLeft - 1, retryDelay * 2);
          });
        }
        return Promise.reject(abortErr);
      }

      var netErr = { type: ERROR.NETWORK, message: err.message || 'Network error' };
      logError(netErr);
      if (retriesLeft > 0) {
        return sleep(retryDelay).then(function () {
          return attemptRequest(endpoint, body, timeout, retriesLeft - 1, retryDelay * 2);
        });
      }
      return Promise.reject(netErr);
    });
  }

  /**
   * Send a message via Hack Club AI (all structured features).
   * POST /api/hackclub
   *
   * @param {Array} messages - Array of {role, content}
   * @param {Object} [options] - Optional overrides
   * @returns {Promise<string>} The assistant response text
   */
  function sendMessage(messages, options) {
    options = options || {};
    var body = buildRequestBody(messages, options);
    var endpoint = options.endpoint || APIConfig.get('endpoint');
    var timeout = options.timeout || APIConfig.get('timeoutMs');
    var maxRetries = options.maxRetries !== undefined ? options.maxRetries : APIConfig.get('maxRetries');
    var retryDelay = APIConfig.get('retryDelayMs');

    return attemptRequest(endpoint, body, timeout, maxRetries, retryDelay);
  }

  /**
   * Abort any active request.
   */
  function abort() {
    if (_activeController) {
      _activeController.abort();
      _activeController = null;
    }
  }

  function isLoading() {
    return _activeController !== null;
  }

  function getStats() {
    return {
      requestCount: _requestCount,
      errorCount: _errorLog.length,
      recentErrors: _errorLog.slice(-5),
      isLoading: isLoading()
    };
  }

  function getErrorLog() {
    return _errorLog.slice();
  }

  function clearErrors() {
    _errorLog = [];
  }

  var errors = {};
  for (var k in ERROR) {
    if (ERROR.hasOwnProperty(k)) errors[k] = ERROR[k];
  }

  return {
    sendMessage: sendMessage,
    abort: abort,
    isLoading: isLoading,
    getStats: getStats,
    getErrorLog: getErrorLog,
    clearErrors: clearErrors,
    ERROR: errors
  };
})();
