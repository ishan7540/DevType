# MERN Typing Test Application

A simple, beginner-friendly typing test application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Typing Test**: 30-second typing test with random words.
- **Live Stats**: Real-time WPM (Words Per Minute) and Accuracy calculation.
- **Authentication**: User registration and login using JWT (JSON Web Tokens).
- **High Scores**: Save your best WPM score to the database.

## Prerequisitess
- Node.js installed on your machine.
- A MongoDB database (local or MongoDB Atlas).
- having a nice personality

## Setup Instructions

### 1. Backend Setup (Server)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Rename `.env.example` to `.env`.
   - Open `.env` and add your MongoDB connection string (URI).
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5001`.

### 2. Frontend Setup (Client)

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` (usually).

## How It Works

### Frontend (React)
- **Home.jsx**: Handles the game logic. It compares the user's input with the generated words character by character to calculate accuracy and WPM.
- **api.js**: A wrapper around `axios` that automatically attaches the JWT token to requests if the user is logged in.
- **Authentication**: When you login, the server sends a token. We store this token in `localStorage`.

### Backend (Node/Express)
- **server.js**: The main entry point. It connects to MongoDB and sets up the API routes.
- **authMiddleware.js**: Protects routes (like saving a score) by verifying the JWT token sent by the frontend.
- **User.js**: The database model. It uses `bcrypt` to hash passwords before saving them, ensuring security.

## API Endpoints

- `POST /api/auth/register`: Create a new user.
- `POST /api/auth/login`: Login and receive a token.
- `GET /api/auth/me`: Get current user details (protected).
- `POST /api/score`: Update high score (protected).

## Troubleshooting
- **Database Connection Error**: Make sure your MongoDB URI in `server/.env` is correct and your IP is whitelisted in MongoDB Atlas.
- **CORS Errors**: The `vite.config.js` is set up to proxy `/api` requests to `localhost:5001`. Ensure both servers are running.
