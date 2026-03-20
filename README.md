# 🧠 CAPSTONE : MATCH THE UNKNOWN

Welcome to **Capstone**, a high-fidelity cognitive training platform designed for elite logic and memory improvement. Built with a stunning high-contrast aesthetic, Capstone offers daily "Match Cards" puzzles, global leaderboards, and real-time cross-platform synchronization.

---

## ✨ Features

- **Match Cards Engine**: A high-speed memory match game with deterministic daily seeds and emoji-based training matrices.
- **Elite Dashboard**: Real-time activity flow heatmaps, daily goal tracking, and personalized streak management.
- **Global Leaderboard**: A competitive ranking ecosystem with a tiered podium system and persistent rank tracking.
- **Cloud Identity**: Secure JWT-based authentication linking your sequences and scores across devices.
- **Ultra-Responsive**: Designed with a "Mobile-First" philosophy, enhanced with immersive holographic kinetic effects for Desktop users.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Server**: [Express](https://expressjs.com/)
- **Database**: [SQLite](https://www.sqlite.org/index.html) (via [Prisma ORM](https://www.prisma.io/))
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Installation
Clone the repository and install the project dependencies:

```bash
git clone https://github.com/himanshu201031/Capstone.git
cd Capstone
npm install --workspaces
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="generate-a-strong-secret-key-here"
```

### 4. Database Initialization
Run the Prisma migrations to set up your local SQLite database:

```bash
cd backend
npx prisma migrate dev --name init
cd ..
```

### 5. Running the Application
Launch both the **Frontend** and **Backend** development servers simultaneously from the root:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:4000`

---

## 🎨 Branding System
Capstone uses a specialized high-contrast design system:
- **Primary**: #FFF500 (Yellow)
- **Secondary**: #C199FF (Lavender)
- **Accent**: #000000 (Black)
- **Rounded Cards**: 4xl (2.5rem) / 5xl (3.0rem)

---

## 📄 License
This project is for development purposes as part of a high-end web training platform showcase. Capstone 2026 Edition.
