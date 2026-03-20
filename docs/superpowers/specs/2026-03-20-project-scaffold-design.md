# Project Scaffold Design Specification

**Date:** 2026-03-20

## Overview

This document outlines the recommended scaffold for the **Capstone** puzzle game project, using **TypeScript + npm** with a monorepo structure powered by **npm workspaces**.

### High‑Level Architecture

```
/ (root)
├─ package.json            ← npm workspaces config
├─ README.md
├─ docs/
│   └─ ...                 ← design spec, guides
├─ frontend/               ← Vite + React + TS
│   ├─ package.json
│   ├─ vite.config.ts
│   ├─ src/
│   │   ├─ app/
│   │   │   ├─ store/       ← Redux Toolkit slices
│   │   │   ├─ components/  ← UI (Puzzle, Timer, Streak, Heatmap, Leaderboard)
│   │   │   ├─ pages/       ← Home, Puzzle, Result, Heatmap, Leaderboard
│   │   │   ├─ hooks/       ← useOffline, useSync, etc.
│   │   │   └─ utils/       ← idb wrapper, crypto helpers
│   └─ index.html, tailwind.css
│
├─ backend/                ← Express + TS API
│   ├─ package.json
│   ├─ tsconfig.json
│   ├─ src/
│   │   ├─ index.ts        ← server bootstrap
│   │   ├─ routes/
│   │   │   └─ sync.ts     ← POST /api/sync (scores, streak)
│   │   ├─ middleware/
│   │   │   └─ validation.ts
│   │   └─ prisma/
│   │       ├─ schema.prisma
│   │       └─ client.ts    ← Prisma client
│   └─ prisma/ (migrations)
│
└─ .gitignore, tsconfig.json (root)
```

## Key Decisions

- **Frontend:** Vite + React + TypeScript for fast hot‑module replacement and easy TS integration.
- **Backend:** Minimal Express server with Prisma ORM for a PostgreSQL database (Neon).
- **Monorepo:** npm workspaces keep dependencies in sync and enable a single `npm install` at the root.
- **Offline‑first:** Frontend uses `idb` (IndexedDB) to store puzzle state locally and flag unsynced data.
- **Sync API:** Simple POST endpoint validates dates, scores, and streak data before persisting.
- **Styling & Animation:** Tailwind CSS for utility‑first styling; Framer Motion for smooth UI animations.
- **State Management:** Redux Toolkit (RTK Query for async sync) isolates UI state from server data.
- **Testing:** Jest + React Testing Library for frontend; Jest + Supertest for backend.
- **Deployment:** Frontend → Vercel (static). Backend → Vercel Serverless Functions or Render.com (Docker‑free). Prisma migrations run on Neon PostgreSQL.

## Detailed API Contract

- **Endpoint:** `POST /api/sync`
- **Auth:** Bearer JWT (issued on login or guest session). Required for all sync requests.
- **Request Body (JSON):**

  ```json
  {
    "userId": "string",
    "date": "YYYY-MM-DD",
    "score": "number",
    "timeTaken": "number", // seconds
    "streak": "number",
    "hintsUsed": "number",
    "hintsRemaining": "number"
  }
  ```

- **Responses:**
  - `200 OK` – `{ "status": "success", "message": "Sync saved" }`
  - `400 Bad Request` – validation errors (e.g., future dates, negative scores)
  - `401 Unauthorized` – missing/invalid JWT
  - `422 Unprocessable Entity` – business rule violations (score out of expected range, unrealistic time)
- **Rate Limiting:** 30 syncs per minute per user (express‑rate‑limit).

## Data Model (Prisma Schema)

```prisma
model User {
  id            String   @id @default(uuid())
  email         String?  @unique
  streakCount   Int      @default(0)
  totalPoints   Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  dailyScores   DailyScore[]
}

model DailyScore {
  id            String   @id @default(uuid())
  userId        String
  date          DateTime
  score         Int
  timeTaken     Int      // seconds
  hintsUsed     Int
  hintsRemaining Int
  createdAt     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id])

  @@unique([userId, date])
}
```

## Testing Strategy

- **Unit Tests:** Jest for pure functions (puzzle generator, scoring, reducers). Aim ≥ 90 % coverage.
- **Integration Tests:** Supertest for `/api/sync` covering success, auth failures, validation errors, rate limiting.
- **End‑to‑End Tests:** Playwright (optional) to verify offline‑online sync flow.
- **CI Integration:** GitHub Actions workflow runs `npm ci`, `npm run lint`, `npm test -- --coverage` and fails on coverage < 90 %.

## Deployment Pipeline

1. **GitHub Actions CI:**
   - `checkout`
   - `setup-node@v3` (npm 9)
   - `npm ci`
   - `npm run lint`
   - `npm test -- --coverage`
   - **Frontend Build:** `npm run build --workspace=frontend`
   - **Backend Build & Prisma Migrate:** `npm run build --workspace=backend && npx prisma migrate deploy`
   - **Deploy:** Push built assets to Vercel via `vercel --prod` (frontend) and Vercel Serverless (backend) or Render.
2. **Secrets Management:**
   - `DATABASE_URL` (Neon PostgreSQL connection string)
   - `JWT_SECRET`
   - `VERCEL_TOKEN`
3. **Rollback:** Tag releases; Vercel/Render keep previous deployments.

## Non‑Functional Requirements

- **Security:**
  - Input validation with Zod (backend) and TypeScript types (frontend).
  - CORS enabled for allowed origins only.
  - HTTPS enforced on Vercel/Render.
  - Rate limiting (30 sync/min).
- **Performance:**
  - API response < 200 ms for sync endpoint under typical load.
  - Frontend bundle size < 150 KB gzipped.
  - Puzzle generation < 50 ms.
- **Reliability:**
  - Automatic retries for failed syncs (exponential backoff).
  - Offline data persisted to IndexedDB with periodic checkpoint.
- **Accessibility:** WCAG AA compliance for UI components (contrast, focus order).
- **Monitoring:** Basic request/exception logging; optional Sentry integration via environment flag.

## Scripts (root `package.json`)

```json
{
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "concurrently \"npm run dev --workspace=frontend\" \"npm run dev --workspace=backend\"",
    "build": "npm run build --workspace=frontend",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
```

## Dependencies (high‑level)

- **Frontend:** `react`, `react-dom`, `vite`, `typescript`, `@reduxjs/toolkit`, `react-redux`, `tailwindcss`, `framer-motion`, `idb`, `axios`.
- **Backend:** `express`, `cors`, `zod`, `prisma`, `@prisma/client`, `typescript`, `ts-node`, `nodemon`.
- **Shared Dev:** `jest`, `supertest`, `@testing-library/react`, `concurrently`.

## Acceptance Criteria

1. `npm install` at the root sets up both workspaces.
2. `npm run dev` launches the Vite dev server (<http://localhost:5173>) and the Express server (<http://localhost:4000>).
3. Offline storage works: puzzle completion updates IndexedDB and flags data as unsynced.
4. When online, the client POSTs unsynced data; the backend validates and stores it in PostgreSQL.
5. Streak and heatmap UI components correctly reflect persisted data.
6. All unit/integration tests pass.
7. Deployment scripts are ready for Vercel (frontend) and Vercel Serverless or Render.com (backend).

## Next Steps

- Review this spec file.
- After approval, the `writing-plans` skill will be invoked to produce a detailed implementation plan.

---

_Generated by Claude Code (superpowers brainstorming)_
