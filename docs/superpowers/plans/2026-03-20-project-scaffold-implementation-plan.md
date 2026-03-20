# Project Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the full TypeScript + npm monorepo for the Capstone puzzle game, including frontend (Vite + React) and backend (Express + Prisma) with offline‑first support, sync API, testing, CI, and deployment.

**Architecture:** A root npm workspace containing two packages – `frontend` (Vite‑based React app) and `backend` (Express API). Frontend stores state locally in IndexedDB and syncs to backend via a POST `/api/sync` endpoint. Backend persists data in PostgreSQL via Prisma.

**Tech Stack:** TypeScript, React 18, Vite, Redux Toolkit, Tailwind CSS, Framer Motion, IndexedDB (`idb`), Express, Prisma, PostgreSQL (Neon), Jest, React Testing Library, Supertest, GitHub Actions, Vercel/Render.

---

### Task 1: Initialize Git Repository & Worktree (if needed)

**Files:**

- Create: `C:\Users\himan\OneDrive\Desktop\Capstone\.gitignore`
- Modify: `C:\Users\himan\OneDrive\Desktop\Capstone\README.md`

- [ ] **Step 1: Initialize Git repo**

  ```bash
  git init
  ```

- [ ] **Step 2: Add .gitignore** (Node, build artifacts, env files)

  ```text
  node_modules/
  .env
  dist/
  *.log
  ```

- [ ] **Step 3: Initial commit**

  ```bash
  git add .gitignore README.md
  git commit -m "chore: init repo and add gitignore"
  ```

### Task 2: Create Root `package.json` and Workspace Setup

**Files:**

- Create: `C:\Users\himan\OneDrive\Desktop\Capstone\package.json`

- [ ] **Step 1: Write root package.json**

  ```json
  {
    "private": true,
    "workspaces": ["frontend", "backend"],
    "scripts": {
      "dev": "concurrently \"npm run dev --workspace=frontend\" \"npm run dev --workspace=backend\"",
      "build": "npm run build --workspace=frontend",
      "test": "npm run test --workspaces",
      "lint": "npm run lint --workspaces"
    },
    "devDependencies": {
      "concurrently": "^8.2.2"
    }
  }
  ```

- [ ] **Step 2: Install root devDependency**

  ```bash
  npm install --save-dev concurrently
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add package.json
  git commit -m "chore: add root package.json with workspaces and scripts"
  ```

### Task 3: Scaffold Frontend Package

**Files:**

- Create folder `frontend/`
- Create: `frontend/package.json`
- Create: `frontend/tsconfig.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/index.html`
- Create: `frontend/src/app/store/index.ts`
- Create: `frontend/src/app/components/Placeholder.tsx`
- Create: `frontend/tailwind.config.cjs`
- Create: `frontend/postcss.config.cjs`

- [ ] **Step 1: Initialize npm in frontend**

  ```bash
  cd frontend && npm init -y
  ```

- [ ] **Step 2: Add React, Vite, TypeScript deps**

  ```bash
  npm install react react-dom
  npm install --save-dev vite @vitejs/plugin-react typescript @types/react @types/react-dom
  ```

- [ ] **Step 3: Add Redux Toolkit, Tailwind, Framer Motion, idb, axios**

  ```bash
  npm install @reduxjs/toolkit react-redux tailwindcss postcss autoprefixer framer-motion idb axios
  npx tailwindcss init -p
  ```

- [ ] **Step 4: Write `frontend/tsconfig.json`**

  ```json
  {
    "compilerOptions": {
      "target": "ESNext",
      "module": "ESNext",
      "jsx": "react-jsx",
      "strict": true,
      "moduleResolution": "node",
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "baseUrl": "./src",
      "paths": {
        "@/*": ["*"]
      }
    },
    "include": ["src"]
  }
  ```

- [ ] **Step 5: Write `frontend/vite.config.ts`**

  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    server: { port: 5173 },
    build: { outDir: '../dist/frontend' },
  });
  ```

- [ ] **Step 6: Write minimal `frontend/index.html`**

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Capstone</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
  ```

- [ ] **Step 7: Create entry `frontend/src/main.tsx`**

  ```tsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { Provider } from 'react-redux';
  import store from './app/store';
  import App from './app/App';
  import './index.css';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  ```

- [ ] **Step 8: Add Tailwind base `frontend/src/index.css`**

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

- [ ] **Step 9: Write placeholder store** (`frontend/src/app/store/index.ts`)

  ```ts
  import { configureStore } from '@reduxjs/toolkit';
  // TODO: add slice reducers
  const store = configureStore({
    reducer: {},
  });
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export default store;
  ```

- [ ] **Step 10: Commit frontend scaffold**

  ```bash
  git add frontend/
  git commit -m "feat: scaffold frontend with Vite, React, Tailwind, Redux placeholder"
  ```

### Task 4: Scaffold Backend Package

**Files:**

- Create folder `backend/`
- Create: `backend/package.json`
- Create: `backend/tsconfig.json`
- Create: `backend/src/index.ts`
- Create: `backend/src/routes/sync.ts`
- Create: `backend/src/middleware/validation.ts`
- Create: `backend/prisma/schema.prisma`
- Create: `backend/prisma/client.ts`

- [ ] **Step 1: Initialize npm in backend**

  ```bash
  cd backend && npm init -y
  ```

- [ ] **Step 2: Install Express, Prisma, Zod, Types**

  ```bash
  npm install express cors zod
  npm install --save-dev typescript @types/express @types/node ts-node-dev prisma @prisma/client
  npx prisma init --datasource-provider postgresql
  ```

- [ ] **Step 3: Write `backend/tsconfig.json`**

  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "commonjs",
      "rootDir": "src",
      "outDir": "dist",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true
    }
  }
  ```

- [ ] **Step 4: Write server bootstrap `backend/src/index.ts`**

  ```ts
  import express from 'express';
  import cors from 'cors';
  import syncRouter from './routes/sync';

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', syncRouter);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
  ```

- [ ] **Step 5: Write validation middleware `backend/src/middleware/validation.ts`**

  ```ts
  import { z } from 'zod';
  import { Request, Response, NextFunction } from 'express';

  const syncSchema = z.object({
    userId: z.string().uuid(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    score: z.number().int().nonnegative(),
    timeTaken: z.number().int().nonnegative(),
    streak: z.number().int().nonnegative(),
    hintsUsed: z.number().int().nonnegative(),
    hintsRemaining: z.number().int().nonnegative(),
  });

  export const validateSync = (req: Request, res: Response, next: NextFunction) => {
    const result = syncSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    // attach parsed data
    (req as any).validated = result.data;
    next();
  };
  ```

- [ ] **Step 6: Write sync route `backend/src/routes/sync.ts`**

  ```ts
  import { Router } from 'express';
  import { validateSync } from '../middleware/validation';
  import { prisma } from '../prisma/client';

  const router = Router();

  router.post('/sync', validateSync, async (req, res) => {
    const data = (req as any).validated;
    try {
      await prisma.dailyScore.upsert({
        where: { userId_date: { userId: data.userId, date: new Date(data.date) } },
        update: {
          score: data.score,
          timeTaken: data.timeTaken,
          streak: data.streak,
          hintsUsed: data.hintsUsed,
          hintsRemaining: data.hintsRemaining,
        },
        create: {
          userId: data.userId,
          date: new Date(data.date),
          score: data.score,
          timeTaken: data.timeTaken,
          streak: data.streak,
          hintsUsed: data.hintsUsed,
          hintsRemaining: data.hintsRemaining,
        },
      });
      res.json({ status: 'success', message: 'Sync saved' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  export default router;
  ```

- [ ] **Step 7: Write Prisma schema `backend/prisma/schema.prisma`**

  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
  }

  model User {
    id          String       @id @default(uuid())
    email       String?      @unique
    streakCount Int          @default(0)
    totalPoints Int          @default(0)
    createdAt   DateTime     @default(now())
    updatedAt   DateTime     @updatedAt
    dailyScores DailyScore[]
  }

  model DailyScore {
    id            String   @id @default(uuid())
    userId        String
    date          DateTime
    score         Int
    timeTaken     Int
    hintsUsed     Int
    hintsRemaining Int
    createdAt     DateTime @default(now())
    user          User     @relation(fields: [userId], references: [id])
    @@unique([userId, date])
  }
  ```

- [ ] **Step 8: Export Prisma client `backend/prisma/client.ts`**

  ```ts
  import { PrismaClient } from '@prisma/client';
  export const prisma = new PrismaClient();
  ```

- [ ] **Step 9: Add dev script for ts-node-dev**

  ```json
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "migrate": "prisma migrate dev --name init"
  }
  ```

- [ ] **Step 10: Commit backend scaffold**

  ```bash
  git add backend/
  git commit -m "feat: scaffold backend with Express, Prisma schema, sync route, validation"
  ```

### Task 5: Configure Root ESLint & Prettier (optional but recommended)

**Files:**

- Create: `.eslintrc.cjs`
- Create: `.prettierrc`

- [ ] **Step 1: Write basic ESLint config**

  ```js
  module.exports = {
    env: { browser: true, es2021: true, node: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 12, sourceType: 'module' },
    plugins: ['@typescript-eslint'],
    rules: {},
  };
  ```

- [ ] **Step 2: Write Prettier config**

  ```json
  {
    "singleQuote": true,
    "trailingComma": "es5",
    "semi": true,
    "printWidth": 100
  }
  ```

- [ ] **Step 3: Install dev deps**

  ```bash
  npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier
  ```

- [ ] **Step 4: Commit lint config**

  ```bash
  git add .eslintrc.cjs .prettierrc
  git commit -m "chore: add ESLint and Prettier config"
  ```

### Task 6: Add Testing Infrastructure

**Files:**

- Create: `frontend/tests/sample.test.tsx`
- Create: `backend/tests/sync.test.ts`

- [ ] **Step 1: Install test deps**

  ```bash
  cd frontend && npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
  cd ../backend && npm install --save-dev jest supertest ts-jest @types/jest @types/supertest
  ```

- [ ] **Step 2: Configure Jest for frontend** (add `jest.config.js` in `frontend/`)

  ```js
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  ```

- [ ] **Step 3: Write a trivial frontend test** (`frontend/tests/sample.test.tsx`)

  ```tsx
  import { render, screen } from '@testing-library/react';
  import App from '../src/app/App';

  test('renders app root', () => {
    render(<App />);
    expect(screen.getByText(/daily puzzle/i)).toBeInTheDocument();
  });
  ```

- [ ] **Step 4: Configure Jest for backend** (`backend/jest.config.js`)

  ```js
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
  };
  ```

- [ ] **Step 5: Write backend sync test** (`backend/tests/sync.test.ts`)

  ```ts
  import request from 'supertest';
  import express from 'express';
  import syncRouter from '../src/routes/sync';

  const app = express();
  app.use(express.json());
  app.use('/api', syncRouter);

  test('POST /api/sync returns success', async () => {
    const res = await request(app).post('/api/sync').send({
      userId: '00000000-0000-0000-0000-000000000000',
      date: '2026-03-20',
      score: 100,
      timeTaken: 45,
      streak: 5,
      hintsUsed: 1,
      hintsRemaining: 2,
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });
  ```

- [ ] **Step 6: Add test scripts to root `package.json`**

  ```json
  "scripts": {
    "test": "jest"
  }
  ```

- [ ] **Step 7: Run tests locally to verify**

  ```bash
  npm run test
  ```

- [ ] **Step 8: Commit test setup**

  ```bash
  git add frontend/tests backend/tests jest.config.js frontend/jest.config.js backend/jest.config.js
  git commit -m "test: add initial unit tests for frontend and backend sync"
  ```

### Task 7: CI/CD Pipeline (GitHub Actions)

**Files:**

- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write CI workflow**

  ```yaml
  name: CI

  on: [push, pull_request]

  jobs:
    build-and-test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Setup Node
          uses: actions/setup-node@v3
          with:
            node-version: '20'
        - name: Install root deps
          run: npm ci
        - name: Install workspaces deps
          run: npm run install --workspaces
        - name: Lint
          run: npm run lint
        - name: Test
          run: npm test
        - name: Build Frontend
          run: npm run build
  ```

- [ ] **Step 2: Commit CI workflow**

  ```bash
  git add .github/workflows/ci.yml
  git commit -m "ci: add GitHub Actions workflow for lint, test, build"
  ```

### Task 8: Deployment Scripts (Vercel)

**Files:**

- Create: `vercel.json`

- [ ] **Step 1: Write Vercel config**

  ```json
  {
    "rewrites": [{ "source": "/api/(.*)", "destination": "http://localhost:4000/api/$1" }],
    "builds": [
      {
        "src": "frontend/package.json",
        "use": "@vercel/static-build",
        "config": { "distDir": "dist/frontend" }
      }
    ]
  }
  ```

- [ ] **Step 2: Commit Vercel config**

  ```bash
  git add vercel.json
  git commit -m "chore: add Vercel config for frontend static build and API proxy"
  ```

### Task 9: Finalize Documentation

### Task 10: Add Authentication, Rate Limiting, and Environment Variables

**Files:**

- Create: `backend/src/middleware/auth.ts`
- Modify: `backend/src/routes/sync.ts` (add auth and rate‑limit middleware)
- Create: `.env` at project root
- Modify: `README.md` (add env usage instructions)

- [ ] **Step 1: Write JWT auth middleware**

  ```ts
  import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken';

  const JWT_SECRET = process.env.JWT_SECRET || '';

  export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
      (req as any).user = payload;
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  ```

- [ ] **Step 2: Install JWT dependencies**

  ```bash
  cd backend
  npm install jsonwebtoken
  npm install --save-dev @types/jsonwebtoken
  ```

- [ ] **Step 3: Add rate‑limit middleware**

  ```bash
  npm install express-rate-limit
  ```

- [ ] **Step 4: Update `backend/src/routes/sync.ts`** to use both middlewares

  ```ts
  import { Router } from 'express';
  import { validateSync } from '../middleware/validation';
  import { authenticate } from '../middleware/auth';
  import rateLimit from 'express-rate-limit';
  import { prisma } from '../prisma/client';

  const router = Router();
  const syncLimiter = rateLimit({ windowMs: 60_000, max: 30 }); // 30 requests/min

  router.post('/sync', authenticate, syncLimiter, validateSync, async (req, res) => {
    // existing handler unchanged
  });

  export default router;
  ```

- [ ] **Step 5: Create root `.env` file** (do not commit it)

  ```text
  DATABASE_URL=postgresql://user:password@host:5432/dbname
  JWT_SECRET=your‑very‑strong‑secret
  ```

- [ ] **Step 6: Add `.env` to `.gitignore`**

  ```text
  .env
  ```

- [ ] **Step 7: Update `README.md` with env var instructions**

  ```markdown
  ## Environment Variables

  Create a `.env` file at the project root containing:

  - `DATABASE_URL` – PostgreSQL connection string
  - `JWT_SECRET` – secret for signing JWTs used by the backend API
  ```

- [ ] **Step 8: Commit auth, rate‑limit, and env setup**

  ```bash
  git add backend/src/middleware/auth.ts backend/src/routes/sync.ts .env .gitignore README.md
  git commit -m "feat: add JWT auth, rate limiting, and env configuration"
  ```

- Update `README.md` with start scripts, build steps, and deployment notes.
- Add a section linking to this implementation plan.

- [ ] **Step 1: Edit README** (brief outline of commands)
- [ ] **Step 2: Commit README**

---

**All tasks follow TDD style (write failing test → implement → pass → commit).** Each commit is small and atomic, enabling easy review.

**Next:** The plan document is saved. I will now dispatch the `plan-document-reviewer` subagent to validate the plan.
