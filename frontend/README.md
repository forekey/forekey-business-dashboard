# Forekey Business Dashboard — Frontend

React + Vite single-page app for the business dashboard.

## Prerequisites

- Node.js 20+ (verified with v24.21.0)
- npm 10+

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Default dev URL: [http://localhost:5173](http://localhost:5173)

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Laravel API base URL (default `http://127.0.0.1:8000/api`) |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

Ensure the Laravel API is running before using Dashboard or Customers pages.
