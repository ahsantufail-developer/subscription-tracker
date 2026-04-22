# Subscription Tracker API

A RESTful API built with **Node.js** and **Express** for managing user subscriptions. Track your subscriptions, billing dates, and renewal schedules — all in one place.

## Features

- 🔐 **Authentication** — Signup, signin, and signout with JWT-based sessions
- 👤 **User Management** — Create, retrieve, and delete user accounts
- 📋 **Subscription Management** — Full CRUD for subscriptions with support for categories, currencies, frequencies, and payment methods
- 📅 **Upcoming Renewals** — Retrieve subscriptions due for renewal
- 🛡️ **Error Handling** — Centralised error middleware for consistent API responses

## Tech Stack

| Layer        | Technology                |
|--------------|---------------------------|
| Runtime      | Node.js (ES Modules)      |
| Framework    | Express 4                 |
| Database     | MongoDB + Mongoose        |
| Auth         | JWT + bcryptjs            |
| Dev tooling  | Nodemon, ESLint           |

## Project Structure

```
subscription-tracker/
├── app.js                  # Entry point
├── config/
│   └── env.js              # Environment variable loader
├── controllers/
│   └── auth.controller.js  # Auth business logic
├── database/
│   └── mongodb.js          # MongoDB connection
├── middlewares/
│   └── error.middleware.js # Global error handler
├── models/
│   ├── user.model.js       # User schema
│   └── subscription.model.js # Subscription schema
└── routes/
    ├── auth.routes.js          # /api/v1/auth
    ├── users.routes.js         # /api/v1/users
    └── subscription.routes.js  # /api/v1/subscriptions
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ahsantufail-developer/subscription-tracker.git
cd subscription-tracker

# 2. Install dependencies
npm install

# 3. Create the environment file
cp config/.env.development.local.example config/.env.development.local
# Edit the file and fill in your values (see Environment Variables below)

# 4. Start the development server
npm run dev
```

The API will be available at `http://localhost:<PORT>`.

## Environment Variables

Create a `config/.env.development.local` file (or `config/.env.production.local` for production) with the following keys:

```env
PORT=3000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/subscription-tracker
JWT_SECRET=your_jwt_secret_here
```

| Variable     | Description                          |
|--------------|--------------------------------------|
| `PORT`       | Port the server listens on           |
| `NODE_ENV`   | Runtime environment (`development` / `production`) |
| `DB_URI`     | MongoDB connection string            |
| `JWT_SECRET` | Secret key used to sign JWT tokens   |

## API Reference

### Base URL

```
http://localhost:<PORT>/api/v1
```

### Authentication — `/auth`

| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| POST   | `/auth/signup`    | Register a new user   |
| POST   | `/auth/signin`    | Log in and get a token|
| POST   | `/auth/signout`   | Log out               |

### Users — `/users`

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | `/users`       | Get all users        |
| GET    | `/users/:id`   | Get user by ID       |
| POST   | `/users`       | Create a new user    |
| DELETE | `/users/:id`   | Delete a user        |

### Subscriptions — `/subscriptions`

| Method | Endpoint                        | Description                  |
|--------|---------------------------------|------------------------------|
| GET    | `/subscriptions`                | Get all subscriptions        |
| GET    | `/subscriptions/:id`            | Get subscription by ID       |
| POST   | `/subscriptions`                | Create a new subscription    |
| PUT    | `/subscriptions/:id`            | Update a subscription        |
| DELETE | `/subscriptions/:id`            | Delete a subscription        |
| GET    | `/subscriptions/user/:id`       | Get subscriptions for a user |
| PUT    | `/subscriptions/:id/cancel`     | Cancel a subscription        |
| GET    | `/subscriptions/upcoming-renewals` | Get upcoming renewals     |

## Scripts

| Command       | Description                            |
|---------------|----------------------------------------|
| `npm start`   | Start the server in production mode    |
| `npm run dev` | Start the server with hot-reload (nodemon) |

## License

This project is open source. Feel free to use and modify it as needed.
