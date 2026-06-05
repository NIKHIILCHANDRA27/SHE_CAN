# She Can Foundation

She Can Foundation is a full-stack MERN NGO platform with a public landing page, secure admin dashboard, contact inquiry submission flow, and analytics for managing submissions.

## Features

- Modern React + Vite frontend with Tailwind CSS and Framer Motion
- Secure Express.js backend with MongoDB Atlas
- JWT-based admin authentication and protected dashboard routes
- Contact inquiry submission form with real-time validation
- Admin dashboard for viewing, filtering, sorting, updating, deleting, and exporting submissions
- Analytics charts for submission trends and status distribution
- Dark / light theme toggle persisted in local storage
- Backend security with helmet, rate limiting, input validation, and request sanitization

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, React Router v6, Axios, React Toastify, Chart.js |
| Backend | Node.js 18+, Express.js 4, Mongoose 8, JSON Web Tokens, bcryptjs |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend), Render (backend) |

## Prerequisites

- Node.js v18+ installed
- npm available
- MongoDB Atlas cluster with connection URI

## Installation

1. Clone the repository:

```bash
git clone <repository-url> she-can-foundation
cd she-can-foundation
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Configure environment variables:

- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`

5. Seed the default admin user:

```bash
cd ../backend
npm run seed
```

6. Run the backend and frontend locally:

```bash
# backend
npm run dev
```

```bash
# frontend
cd ../frontend
npm run dev
```

7. Open the frontend at `http://localhost:5173`.

## MongoDB Atlas Setup Guide

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
2. Create a new cluster and database user.
3. Add your IP address to the cluster network access list.
4. Create a database named `shecan` or use the default URI placeholder.
5. Copy the connection string and set `MONGODB_URI` in `backend/.env`.

## Environment Variables

### `backend/.env`

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | JWT expiration time (default: 7d) |
| `CLIENT_URL` | Frontend URL allowed by CORS |
| `NODE_ENV` | Environment mode (`development` or `production`) |
| `ADMIN_NAME` | Seed admin display name |
| `ADMIN_EMAIL` | Seed admin email |
| `ADMIN_PASSWORD` | Seed admin password |

### `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

## API Documentation

Base URL: `http://localhost:5000/api`

### Auth

#### POST `/auth/login`

Login admin with email and password.

Request:

```json
{
  "email": "admin@shecan.org",
  "password": "Admin@123"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "admin": {
    "id": "...",
    "name": "She Can Admin",
    "email": "admin@shecan.org"
  }
}
```

#### GET `/auth/me`

Get current admin profile.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "admin": {
    "_id": "...",
    "name": "She Can Admin",
    "email": "admin@shecan.org"
  }
}
```

### Contact

#### POST `/contact`

Submit a new inquiry.

Request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "subject": "Volunteer inquiry",
  "message": "I would like to learn more about your programs."
}
```

Response:

```json
{
  "message": "Submission received successfully",
  "contact": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "subject": "Volunteer inquiry",
    "message": "I would like to learn more about your programs.",
    "status": "Pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### GET `/contact`

Get paginated submissions.

Query params:

- `page` (default: 1)
- `limit` (default: 10)
- `status` (`Pending`, `Reviewed`, `Resolved`)
- `search`
- `sort` (`createdAt`, `name`, `status`)
- `order` (`asc`, `desc`)

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "page": 1,
  "limit": 10,
  "total": 20,
  "contacts": [ ... ]
}
```

#### GET `/contact/:id`

Get a single submission by ID.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "contact": { ... }
}
```

#### PUT `/contact/:id`

Update submission status.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Request:

```json
{ "status": "Reviewed" }
```

Response:

```json
{
  "message": "Submission status updated",
  "contact": { ... }
}
```

#### DELETE `/contact/:id`

Delete a submission.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{ "message": "Submission deleted successfully" }
```

#### GET `/contact/export/csv`

Export all submissions as CSV.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response headers:

- `Content-Type: text/csv`
- `Content-Disposition: attachment; filename="submissions.csv"`

#### GET `/contact/stats`

Get counts by status.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "pending": 5,
  "reviewed": 8,
  "resolved": 12,
  "total": 25
}
```

#### GET `/contact/trend`

Get submission counts for the last 7 days.

Headers:

```http
Authorization: Bearer JWT_TOKEN
```

Response:

```json
{
  "trend": [
    { "date": "2026-06-01T00:00:00.000Z", "count": 2 },
    ...
  ]
}
```

## Deployment Guide

### Render (Backend)

1. Create a new Web Service on Render.
2. Connect your repository and select the backend folder.
3. Set the build command to `npm install` and the start command to `npm start`.
4. Add environment variables from `backend/.env.example` to Render.
5. Deploy and copy the generated backend URL.

### Vercel (Frontend)

1. Create a new Vercel project and link the repository.
2. Set the root directory to `frontend`.
3. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variable `VITE_API_URL` with your Render backend URL.
5. Deploy.

### MongoDB Atlas

- Use the Atlas connection URI in `MONGODB_URI`.
- Ensure your Render backend IP or `0.0.0.0/0` is allowed if needed.

## Screenshots

- `screenshots/landing-page.png`
- `screenshots/admin-dashboard.png`
- `screenshots/submissions-table.png`
- `screenshots/contact-form.png`

## Contributing

Contributions are welcome. Please open an issue or pull request with enhancements, bug fixes, or documentation improvements.

## License

MIT License
