# Projectspace Dashboard

A small Next.js dashboard demo with email/password sign-in, signed HTTP-only sessions, protected pages and Route Handler APIs. Demo records are stored in application code; no database is required.

## Requirements

- Node.js 20.9 or later
- npm

## Local setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`.
3. Set `DEMO_EMAIL` and `DEMO_PASSWORD` to the credentials you want to use. Set `SESSION_SECRET` to a random value of at least 32 characters (for example, generate one with `openssl rand -base64 32`).
4. Start the app: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) and sign in with the values from `.env.local`.

Never commit `.env.local` or a real secret. `.env*` files are ignored by Git; `.env.example` contains placeholders only.

## Routes

- `/login` — demo sign-in
- `/dashboard` — overview and recent activity
- `/dashboard/projects` — searchable project list
- `/dashboard/settings` — profile and sign-out
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/projects?q=search-term`, `GET /api/overview`

Protected pages redirect to `/login`; protected APIs return a consistent `{ "error": { "code", "message" } }` JSON shape with HTTP 401 when there is no valid session. Successful responses use `{ "data": ... }`.

## Production build

Run `npm run build`, then `npm start` to serve the production build locally.

## Deploy to Vercel

1. Push this project to a Git provider and import the repository in Vercel, or run `npx vercel` from the project directory.
2. In the Vercel project settings, add `DEMO_EMAIL`, `DEMO_PASSWORD` and `SESSION_SECRET` under Environment Variables for the environments you intend to use. Use a unique random `SESSION_SECRET` of at least 32 characters.
3. Deploy. Vercel detects Next.js automatically; no `vercel.json` or other platform configuration is needed.

The session cookie is `httpOnly`, uses `sameSite=lax`, has a seven-day lifetime, and is marked `secure` in production. This is a demo sign-in intended for trying the dashboard, not a replacement for a production identity provider.
