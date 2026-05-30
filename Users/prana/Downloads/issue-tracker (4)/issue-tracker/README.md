# Issue Tracker — Full Stack (React + Node.js + MongoDB)

## How to Run

### Step 1 — Start MongoDB
```bash
brew services start mongodb/brew/mongodb-community
```

### Step 2 — Start Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
# ✅ Connected to MongoDB
# 🚀 Server running on http://localhost:5000
```

### Step 3 — Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
# Open: http://localhost:5173
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/issues/stats | Dashboard stats |
| GET | /api/issues | Get all issues (filter by status/priority/search) |
| GET | /api/issues/:id | Get single issue |
| POST | /api/issues | Create issue |
| PUT | /api/issues/:id | Update issue |
| DELETE | /api/issues/:id | Delete issue |
| POST | /api/issues/:id/comments | Add comment |
| DELETE | /api/issues/:id/comments/:cid | Delete comment |
| GET | /api/team | Get all team members |
| POST | /api/team | Add team member |
| DELETE | /api/team/:id | Remove team member |
