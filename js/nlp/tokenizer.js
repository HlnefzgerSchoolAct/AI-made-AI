// ============================================================
// Tokenizer — splits, cleans, and normalizes user input
// Handles Spanish characters (ñ, á, é, í, ó, ú, ü, ¿, ¡)
// ============================================================
var Tokenizer = (function () {
  'use strict';

  // Common English stop words (kept minimal — we still want content words)
  var STOP_WORDS = new Set([
    'a','an','the','is','are','was','were','am','be','been','being',
    'do','does','did','will','would','shall','should','may','might',
    'can','could','has','have','had','having','i','me','my','mine',
    'you','your','yours','he','him','his','she','her','hers','it',
    'its','we','us','our','ours','they','them','their','theirs',
    'this','that','these','those','of','in','to','for','with','on',
    'at','from','by','as','into','through','during','before','after',
    'above','below','between','out','off','over','under','again',
    'further','then','once','here','there','when','where','why',
    'how','all','both','each','few','more','most','other','some',
    'such','no','nor','not','only','own','same','so','than','too',
    'very','just','because','but','and','or','if','while','about',
    'up','down'
  ]);

  /**
   * Tokenize raw input text into an array of cleaned, lowercased tokens.
   * Preserves Spanish characters and accented vowels.
   */
  function tokenize(text) {
    if (!text || typeof text !== 'string') return [];
    // Lowercase
    var s = text.toLowerCase().trim();
    // Replace common contractions
    s = s.replace(/n't/g, ' not')
         .replace(/'re/g, ' are')
         .replace(/'s/g, ' is')
         .replace(/'ll/g, ' will')
         .replace(/'ve/g, ' have')
         .replace(/'m/g, ' am')
         .replace(/'d/g, ' would');
    // Keep letters (including accented), digits, spaces; strip the rest
    s = s.replace(/[^a-záéíóúüñ0-9\s]/g, ' ');
    // Split on whitespace, filter empties
    var tokens = s.split(/\s+/).filter(function (t) { return t.length > 0; });
    return tokens;
  }

  /**
   * Remove stop words from token array.
   */
  function removeStopWords(tokens) {
    return tokens.filter(function (t) { return !STOP_WORDS.has(t); });
  }

  /**
   * Simple stemming — trims common English suffixes.
   * Not a full Porter stemmer but covers the most frequent cases
   * relevant to our intent matching.
   */
  function stem(word) {
    if (word.length < 4) return word;
    // Order matters — longest suffixes first
    var suffixes = [
      'ational','tional','encies','ances','ments','ings','tion',
      'sion','ness','ment','ence','ance','able','ible','ful',
      'less','ous','ive','ing','ity','ies','ers','est','ent',
      'ant','ism','ist','ize','ise','fy','ly','ed','er','al',
      'es','en','s'
    ];
    for (var i = 0; i < suffixes.length; i++) {
      var suf = suffixes[i];
      if (word.length - suf.length >= 3 && word.endsWith(suf)) {
        return word.slice(0, word.length - suf.length);
      }
    }
    return word;
  }

  /**
   * Full pipeline: tokenize → optional stop-word removal → optional stemming.
   */
  function process(text, options) {
    var opts = options || {};
    var tokens = tokenize(text);
    if (opts.removeStopWords) {
      tokens = removeStopWords(tokens);
    }
    if (opts.stem) {
      tokens = tokens.map(stem);
    }
    return tokens;
  }

  return {
    tokenize: tokenize,
    removeStopWords: removeStopWords,
    stem: stem,
    process: process,
    STOP_WORDS: STOP_WORDS
  };
})();
