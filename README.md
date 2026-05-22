 HireHub Backend

HireHub is a backend system for a job platform where candidates and employers connect directly, manage profiles, and handle job applications efficiently.

🧠 Tech Stack
Node.js + TypeScript
Express.js
PostgreSQL
Drizzle ORM
JWT Authentication (Access + Refresh Tokens)
Redis (sessions, refresh tokens, caching, rate limiting)
Docker + Docker Compose
Zod (validation)
RBAC (Role-Based Access Control)
📦 Features
👤 Authentication
User registration & login
JWT-based auth (access + refresh tokens)
Secure password hashing (bcrypt)
Role-based access (candidate / employer / admin)
🧑‍💼 Candidate Features
Profile creation & update
Skills & experience management
Apply to jobs
🏢 Employer Features
Company profile management
Post, update, delete jobs
View applicants
⚙️ System Features
Redis-based refresh token storage
Rate limiting for APIs
Centralized error handling
Input validation using Zod
🏗️ Project Structure
src/
│
├── config/          # DB, Redis, env configs
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middlewares/     # Auth, error handling, RBAC
├── db/              # Drizzle schema + migrations
├── utils/           # Helpers (JWT, hashing, etc.)
├── types/           # TypeScript types
└── app.ts           # Express app entry
⚙️ Installation & Setup
1. Clone repo
git clone https://github.com/your-username/hirehub-backend.git
cd hirehub-backend
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file:

PORT=5000

DATABASE_URL=postgresql://user:password@localhost:5432/hirehub

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

REDIS_URL=redis://localhost:6379
4. Run database migrations (Drizzle)
npm run db:generate
npm run db:migrate
5. Start Redis (Docker recommended)
docker run -d -p 6379:6379 redis
6. Run server
npm run dev
🐳 Run with Docker
docker-compose up --build
📡 API Endpoints (Sample)
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
Jobs
GET    /api/jobs
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
Profile
GET  /api/profile
PUT  /api/profile
🔐 Security Features
JWT Access + Refresh token system
Redis session tracking
Password hashing (bcrypt)
Rate limiting to prevent abuse
Role-based route protection
🚀 Future Improvements
WebSocket-based chat system (candidate ↔ employer)
AI-based job matching system
Email notifications (job alerts, applications)
Elasticsearch for advanced job search
Admin dashboard APIs
👨‍💻 Author

Awais Hyder
Backend Developer (Node.js + Spring Boot Enthusiast)