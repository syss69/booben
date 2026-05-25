# Booben

MVP frontend for the Reviewer API — generate AI product reviews from marketplace links.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- react-i18next (English, Russian and French)

## Setup

```bash
npm install
cp .env.example .env
```

## Development

1. Start the [Reviewer API](../reviewer) on port 3000:

   ```bash
   cd ../reviewer && npm run start:dev
   ```

2. Start the frontend:

   ```bash
   npm run dev
   ```

Open http://localhost:5173

### API URL

- **Direct:** `VITE_API_URL=http://localhost:3000` (requires CORS on the API)
- **Proxy (recommended in dev):** `VITE_API_URL=/api` — Vite proxies `/api` → `http://localhost:3000`

### Vercel

**Frontend project** (recommended — no CORS):

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `/api` |
| `API_UPSTREAM` | `https://your-api.vercel.app` |

Redeploy after changing env vars. `api/[...path].ts` proxies `/api/*` to the backend (same as nginx/Docker).

**Direct API URL** in the bundle: set `VITE_API_URL=https://your-api.vercel.app`. For Nest on Vercel, `/api` is added to paths automatically for `*.vercel.app` hosts, or set `VITE_API_URL=https://your-api.vercel.app/api` and `VITE_API_INCLUDE_PREFIX=false`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
