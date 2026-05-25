import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Proxies /api/* → API_UPSTREAM (same as Vite dev proxy and nginx).
 * On Vercel: VITE_API_URL=/api and API_UPSTREAM=https://your-api.vercel.app
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const upstream = process.env.API_UPSTREAM?.replace(/\/+$/, '');
  if (!upstream) {
    res.status(500).json({ message: 'API_UPSTREAM is not configured' });
    return;
  }

  const segments = req.query.path;
  const path = Array.isArray(segments)
    ? segments.join('/')
    : typeof segments === 'string'
      ? segments
      : '';

  const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const target = `${upstream}/${path}${query}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (key.toLowerCase() === 'host' || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  const method = req.method ?? 'GET';
  const hasBody = method !== 'GET' && method !== 'HEAD';

  let response: Response;
  try {
    response = await fetch(target, {
      method,
      headers,
      body: hasBody && req.body !== undefined ? JSON.stringify(req.body) : undefined,
    });
  } catch {
    res.status(502).json({ message: 'Failed to reach API upstream' });
    return;
  }

  res.status(response.status);
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'transfer-encoding') return;
    res.setHeader(key, value);
  });

  const text = await response.text();
  res.send(text);
}
