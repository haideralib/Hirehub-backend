<div align="center">

# 🚀 HireHub Backend

**A robust, production-ready job platform API where candidates and employers connect directly.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## 📖 Overview

HireHub is a backend system for a modern job platform. It provides a secure, scalable REST API for candidates to discover and apply to jobs, and employers to post listings and manage applicants — all backed by JWT authentication, Redis caching, and role-based access control.

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL + Drizzle ORM |
| Cache / Sessions | Redis |
| Auth | JWT (Access + Refresh Tokens) |
| Validation | Zod |
| Access Control | RBAC (candidate / employer / admin) |
| Containerization | Docker + Docker Compose |

---

## ✨ Features

### 👤 Authentication
- User registration & login
- JWT-based auth with access + refresh token rotation
- Secure password hashing with bcrypt
- Role-based access: `candidate` / `employer` / `admin`

### 🧑‍💼 Candidate
- Create and update profile
- Manage skills & experience
- Browse and apply to job listings

### 🏢 Employer
- Company profile management
- Post, update, and delete job listings
- View and manage applicants

### ⚙️ System
- Redis-backed refresh token storage & session management
- API rate limiting
- Centralized error handling middleware
- Input validation via Zod schemas

---

## 🏗️ Project Structure

```
src/
├── config/          # DB, Redis, and environment configs
├── controllers/     # Request handlers
├── services/        # Business logic layer
├── routes/          # API route definitions
├── middlewares/     # Auth, RBAC, error handling
├── db/              # Drizzle ORM schema & migrations
├── utils/           # JWT helpers, hashing utilities
├── types/           # Shared TypeScript types
└── app.ts           # Express app entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- Redis
- Docker (optional but recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hirehub-backend.git
cd hirehub-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/hirehub
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
REDIS_URL=redis://localhost:6379
```

### 4. Run Database Migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start Redis

```bash
docker run -d -p 6379:6379 redis
```

### 6. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

---

## 🐳 Docker Setup

Run the entire stack (API + PostgreSQL + Redis) with a single command:

```bash
docker-compose up --build
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive tokens |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `POST` | `/api/auth/logout` | Invalidate refresh token |

### Jobs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | List all job postings | Public |
| `POST` | `/api/jobs` | Create a new job | Employer |
| `PUT` | `/api/jobs/:id` | Update a job listing | Employer |
| `DELETE` | `/api/jobs/:id` | Delete a job listing | Employer |

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/profile` | Get current user profile |
| `PUT` | `/api/profile` | Update current user profile |

---

## 🔐 Security

- **JWT Rotation** — Short-lived access tokens with refresh token rotation
- **Redis Sessions** — Refresh tokens stored and invalidated server-side
- **Bcrypt Hashing** — All passwords hashed with bcrypt before storage
- **Rate Limiting** — Per-IP rate limiting on sensitive endpoints
- **RBAC** — Routes protected by role middleware; candidates cannot access employer routes and vice versa
- **Zod Validation** — All incoming request bodies validated before reaching business logic

---

## 🚀 Roadmap

- [ ] WebSocket-based real-time chat (candidate ↔ employer)
- [ ] AI-powered job matching engine
- [ ] Email notifications (job alerts, application updates)
- [ ] Elasticsearch integration for advanced job search
- [ ] Admin dashboard APIs

---

## 👨‍💻 Author

**Awais Hyder**
Backend Developer — Node.js & Spring Boot

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

---

<div align="center">

Made with ❤️ by Awais Hyder

</div>
