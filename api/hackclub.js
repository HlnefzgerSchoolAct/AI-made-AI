// Vercel serverless function — proxies requests to Hack Club AI API
// Keeps the API key server-side so it never reaches the browser.

const UPSTREAM = 'https://ai.hackclub.com/chat/completions';

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.HACKCLUB_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'HACKCLUB_API_KEY not configured on server' });
  }

  // Validate request body
  const { messages, model, max_tokens, temperature } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }

  for (const msg of messages) {
    if (!msg.role || typeof msg.content !== 'string') {
      return res.status(400).json({ error: 'Each message must have role and content' });
    }
  }

  // Build upstream request body
  const body = {
    messages,
    model: model || 'gpt-4o-mini',
    max_tokens: Math.min(max_tokens || 1024, 4096),
    temperature: temperature != null ? temperature : 0.7
  };

  try {
    const upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await upstream.text();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: 'Upstream API error',
        status: upstream.status,
        detail: data.substring(0, 500)
      });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach Hack Club API', detail: err.message });
  }
};
