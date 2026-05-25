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

Set `VITE_API_URL` to the API origin (no trailing slash). CORS must be allowed on the API for the frontend origin.

- **Local:** `VITE_API_URL=http://localhost:3000`
- **Vercel:** `VITE_API_URL=https://your-api.vercel.app` — redeploy after changing

Optional dev proxy: `VITE_API_URL=/api` — Vite proxies `/api` → `http://localhost:3000` (no CORS in dev).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
