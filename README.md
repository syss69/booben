# Booben

MVP frontend for the Reviewer API — generate AI product reviews from marketplace links.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- react-i18next (English UI; Russian and French planned)

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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
