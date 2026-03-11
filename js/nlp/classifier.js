// ============================================================
// Intent Classifier — bag-of-words + cosine similarity
// Classifies user input against trained intent phrases
// ============================================================
var Classifier = (function () {
  'use strict';

  var vocabulary = {};   // word → index
  var vocabSize = 0;
  var intentVectors = []; // [{tag, vector}]
  var trained = false;

  /**
   * Build a bag-of-words vector from tokens using the current vocabulary.
   */
  function toVector(tokens) {
    var vec = new Float32Array(vocabSize);
    for (var i = 0; i < tokens.length; i++) {
      var idx = vocabulary[tokens[i]];
      if (idx !== undefined) {
        vec[idx] += 1;
      }
    }
    return vec;
  }

  /**
   * Cosine similarity between two vectors.
   */
  function cosine(a, b) {
    var dot = 0, magA = 0, magB = 0;
    for (var i = 0; i < a.length; i++) {
      dot  += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }

  /**
   * Train the classifier on an array of intents.
   * Each intent: { tag: string, patterns: string[] }
   */
  function train(intents) {
    vocabulary = {};
    vocabSize = 0;
    intentVectors = [];

    // Build vocabulary from ALL patterns
    var allTokenSets = []; // parallel to a flat list of {tag, tokens}
    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];
      for (var j = 0; j < intent.patterns.length; j++) {
        var tokens = Tokenizer.process(intent.patterns[j], { removeStopWords: true, stem: true });
        allTokenSets.push({ tag: intent.tag, tokens: tokens });
        for (var k = 0; k < tokens.length; k++) {
          if (vocabulary[tokens[k]] === undefined) {
            vocabulary[tokens[k]] = vocabSize++;
          }
        }
      }
    }

    // Build intent vectors — average of all pattern vectors per intent
    var tagMap = {};
    for (var i = 0; i < allTokenSets.length; i++) {
      var entry = allTokenSets[i];
      if (!tagMap[entry.tag]) {
        tagMap[entry.tag] = { tag: entry.tag, vectors: [] };
      }
      tagMap[entry.tag].vectors.push(toVector(entry.tokens));
    }

    var tags = Object.keys(tagMap);
    for (var i = 0; i < tags.length; i++) {
      var group = tagMap[tags[i]];
      // Store each pattern vector individually for better matching
      for (var v = 0; v < group.vectors.length; v++) {
        intentVectors.push({ tag: group.tag, vector: group.vectors[v] });
      }
    }

    trained = true;
  }

  /**
   * Classify input text. Returns sorted array of {tag, confidence}.
   */
  function classify(text) {
    if (!trained) return [];

    var tokens = Tokenizer.process(text, { removeStopWords: true, stem: true });
    var inputVec = toVector(tokens);

    // Score each intent vector
    var scores = {};
    for (var i = 0; i < intentVectors.length; i++) {
      var iv = intentVectors[i];
      var sim = cosine(inputVec, iv.vector);
      if (!scores[iv.tag] || sim > scores[iv.tag]) {
        scores[iv.tag] = sim;
      }
    }

    // Also do a simple keyword overlap boost for short inputs
    var inputTokensRaw = Tokenizer.tokenize(text);
    // (keyword boost handled in entities/conversation layer)

    var results = [];
    var tags = Object.keys(scores);
    for (var i = 0; i < tags.length; i++) {
      if (scores[tags[i]] > 0) {
        results.push({ tag: tags[i], confidence: scores[tags[i]] });
      }
    }

    results.sort(function (a, b) { return b.confidence - a.confidence; });
    return results;
  }

  /**
   * Get the top classification result, or null if below threshold.
   */
  function getTopIntent(text, threshold) {
    var th = threshold || 0.15;
    var results = classify(text);
    if (results.length > 0 && results[0].confidence >= th) {
      return results[0];
    }
    return null;
  }

  return {
    train: train,
    classify: classify,
    getTopIntent: getTopIntent
  };
})();
