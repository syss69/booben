/** Normalize VITE_API_URL (relative /api or absolute backend URL). */
export function normalizeApiBase(raw: string | undefined): string {
  const fallback = '/api';
  if (!raw?.trim()) return fallback;

  let base = raw.trim().replace(/\/+$/, '');
  if (!base.startsWith('/') && !/^https?:\/\//i.test(base)) {
    base = `https://${base}`;
  }
  return base;
}

/** Nest on Vercel serves under /api; local API uses root paths. */
export function shouldPrefixApiSegment(base: string): boolean {
  if (base.startsWith('/')) return false;
  if (base.endsWith('/api')) return false;

  const flag = import.meta.env.VITE_API_INCLUDE_PREFIX as string | undefined;
  if (flag === 'true') return true;
  if (flag === 'false') return false;

  try {
    const { hostname } = new URL(base);
    return hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

export function buildApiUrl(path: string): string {
  const base = normalizeApiBase(import.meta.env.VITE_API_URL as string | undefined);
  const segment = path.startsWith('/') ? path : `/${path}`;

  if (base.startsWith('/')) {
    return `${base}${segment}`;
  }

  if (shouldPrefixApiSegment(base)) {
    return `${base}/api${segment}`;
  }

  return `${base}${segment}`;
}
