# ⬡ DevForge

A futuristic e-learning platform for developers. Built with React, Redux Toolkit, and React Router v6.

## Overview

DevForge is a structured, real-world style online learning application where users can browse courses, enroll, watch lessons, and track their learning progress. Built as a React engineering assignment to demonstrate production patterns: custom hooks, Redux state management, protected routes, nested routing, and clean folder architecture.

## Demo Flow
```
Login → Browse Catalog → Enroll → Watch Lesson → Mark Complete
```

> Any email + any password works for login.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI rendering with hooks |
| Redux Toolkit | Global state — auth, courses, progress |
| React Router v6 | Client-side routing + nested routes |
| Vite | Build tooling and dev server |
| react-redux | Connects Redux store to React |
| YouTube iFrame | Embedded video lessons |

---

## Features

### Authentication + Protected Routes
- Login with any email and password
- `useAuth` custom hook wraps Redux auth state
- `ProtectedRoute` redirects unauthenticated users to `/login`

### Course Catalog
- Browse all courses with real-time category filtering
- Cards show instructor, rating, duration, level, and enrolled status

### Enrollment System
- Enroll and unenroll directly on the Course Detail page
- Enrollment state reflected instantly across Dashboard and Catalog

### Nested Lesson Player
- Nested routes: `/courses/:id/lessons/:lessonId`
- Parent route renders layout, child renders inside via `<Outlet />`
- Each lesson embeds a real YouTube video

### Progress Tracking
- `useProgress` custom hook manages lesson completion in Redux
- Mark lessons complete or incomplete with a toggle
- Progress bar updates in real time on Course Detail and Dashboard

---

## Custom Hooks

| Hook | What it does |
|---|---|
| `useAuth` | Wraps Redux auth state. Returns `user`, `isAuthenticated`, `loginUser`, `logoutUser` |
| `useProgress` | Takes `courseId` + `totalLessons`. Returns `completedLessons`, `percentage`, `isLessonComplete`, `toggleLesson` |

---

## Folder Structure
```
src/
├── components/        # Reusable UI — Navbar, ProtectedRoute
├── pages/             # Route-level pages
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── CourseCatalogPage.jsx
│   ├── CourseDetailPage.jsx
│   └── LessonPlayerPage.jsx
├── store/             # Redux slices + store config
│   ├── index.js
│   ├── authSlice.js
│   ├── courseSlice.js
│   └── progressSlice.js
├── hooks/             # Custom hooks
│   ├── useAuth.js
│   └── useProgress.js
├── data/              # Mock course + lesson data
│   └── courses.js
├── App.jsx            # Route definitions
└── main.jsx           # Redux Provider + app entry
```

---

## Setup
```bash
# 1. Clone the repo
git clone https://github.com/richyfabz/DevForge.git
cd DevForge

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
http://localhost:5173
```

---

## Branch Structure

| Branch | Purpose |
|---|---|
| `main` | Stable production-ready code |
| `develop` | Active development integration |
| `features/auth` | Authentication + protected routes |
| `feature/courses` | Catalog, enrollment, lesson player, progress |

---

## Author

**Fabunmi Richard** — Developer based in Lagos, Nigeria

- GitHub: [@richyfabz](https://github.com/richyfabz)
- LinkedIn: [fabunmi-richard](https://linkedin.com/in/fabunmi-richard-a686ab23b)
- Twitter/X: [@damilola356075](https://x.com/damilola356075)

---

*Built with React + Redux Toolkit + React Router v6*
