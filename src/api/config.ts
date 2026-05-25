/** Build full request URL from VITE_API_URL + path (no extra /api prefix). */
export function buildApiUrl(path: string): string {
  const raw = import.meta.env.VITE_API_URL as string | undefined;
  const fallback = 'http://localhost:3000';

  let base = raw?.trim() || fallback;
  base = base.replace(/\/+$/, '');

  if (!base.startsWith('/') && !/^https?:\/\//i.test(base)) {
    base = `https://${base}`;
  }

  const segment = path.startsWith('/') ? path : `/${path}`;
  return `${base}${segment}`;
}
