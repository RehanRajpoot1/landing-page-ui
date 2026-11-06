# Nimbus Landing Page

A landing page built with **React + Vite** on the frontend and a small **Express** API on the backend.
No Docker or CI/CD yet — this is the plain app that we'll add DevOps tooling to, step by step.

## Tech stack

| Area         | Libraries                                                                              |
| ------------ | -------------------------------------------------------------------------------------- |
| Frontend     | React 19, Vite, Tailwind CSS v4, framer-motion, lucide-react, Inter font (@fontsource) |
| Backend      | Express 5, helmet, cors, morgan, dotenv, zod                                           |
| Testing      | Vitest, Testing Library, jsdom, supertest                                              |
| Code quality | ESLint, Prettier                                                                       |
| Dev tools    | concurrently, nodemon                                                                  |

## Project structure

```
nimbus-landing/
├── public/              # Static files (favicon)
├── server/
│   ├── app.js           # Express app (API + serves built frontend)
│   ├── app.test.js      # API tests
│   └── index.js         # Starts the server
├── src/
│   ├── components/      # React components (Navbar, Hero, Pricing, ...)
│   ├── lib/api.js       # Frontend calls to the API
│   ├── test/setup.js    # Test setup
│   ├── App.jsx
│   ├── App.test.jsx     # Frontend tests
│   ├── index.css        # Tailwind + theme
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Getting started

Requires **Node.js 20+**.

```bash
npm install
cp .env.example .env      # Windows PowerShell: Copy-Item .env.example .env
```

### Development (frontend + API together)

```bash
npm run dev
```

- Frontend: http://localhost:5173 (hot reload)
- API: http://localhost:3000 (auto-restarts on change)

Vite forwards `/api/*` calls to the API, so the frontend works as-is.

### Production-style run

```bash
npm run build     # builds the frontend into dist/
npm start         # Express serves dist/ + the API on one port
```

Open http://localhost:3000

## Scripts

| Command                | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Run frontend and API together           |
| `npm run build`        | Build the frontend into `dist/`         |
| `npm start`            | Start the Express server                |
| `npm test`             | Run all tests once                      |
| `npm run test:watch`   | Run tests in watch mode                 |
| `npm run lint`         | Check code with ESLint                  |
| `npm run format`       | Format code with Prettier               |
| `npm run format:check` | Check formatting without changing files |

## API endpoints

| Method | Path                  | Description                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| GET    | `/api/health`         | Health check — status, version, uptime                |
| GET    | `/api/waitlist/count` | Number of emails on the waitlist                      |
| POST   | `/api/waitlist`       | Add an email — body: `{ "email": "you@example.com" }` |

The waitlist is stored in memory for now, so it resets when the server restarts.

## Environment variables

| Name       | Default  | Description                    |
| ---------- | -------- | ------------------------------ |
| `PORT`     | `3000`   | Port the server listens on     |
| `APP_NAME` | `Nimbus` | Name returned by `/api/health` |
