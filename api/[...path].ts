export const config = {
  runtime: 'edge',
};

/**
 * Proxies /api/* → API_UPSTREAM (same as Vite dev proxy and nginx).
 * On Vercel: VITE_API_URL=/api and API_UPSTREAM=https://your-api.vercel.app
 */
export default async function handler(request: Request): Promise<Response> {
  const upstream = process.env.API_UPSTREAM?.replace(/\/+$/, '');
  if (!upstream) {
    return Response.json(
      { message: 'API_UPSTREAM is not configured' },
      { status: 500 },
    );
  }

  const incoming = new URL(request.url);
  const pathAfterApi = incoming.pathname.replace(/^\/api\/?/, '');
  const target = new URL(
    pathAfterApi + incoming.search,
    upstream.endsWith('/') ? upstream : `${upstream}/`,
  );

  const headers = new Headers(request.headers);
  headers.delete('host');

  const method = request.method;
  const hasBody = method !== 'GET' && method !== 'HEAD';

  try {
    return await fetch(target, {
      method,
      headers,
      body: hasBody ? request.body : undefined,
    });
  } catch {
    return Response.json(
      { message: 'Failed to reach API upstream' },
      { status: 502 },
    );
  }
}
