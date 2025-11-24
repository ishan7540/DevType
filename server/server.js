/**
 * server.js
 * Entry point for the Node.js/Express backend.
 * 
 * Responsibilities:
 * 1. Load environment variables.
 * 2. Connect to MongoDB.
 * 3. Configure Express middleware (CORS, JSON parsing).
 * 4. Mount API routes.
 * 5. Start the server.
 */

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const scoreRoutes = require('./routes/score');

const app = express();

// --- Middleware ---

// Enable CORS (Cross-Origin Resource Sharing)
// This allows our React frontend (running on a different port) to communicate with this backend.
app.use(cors());

// Parse incoming JSON payloads
// This allows us to access request body data via req.body
app.use(express.json());

// --- Database Connection ---

// Connect to MongoDB using the URI from .env
// Mongoose handles the connection logic.
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        // It's often good practice to exit if the DB connection fails, 
        // as the API depends on it.
        process.exit(1);
    });

// --- Routes ---

// Mount authentication routes under /api/auth
// Example: POST /api/auth/register, POST /api/auth/login
app.use('/api/auth', authRoutes);

// Mount score routes under /api/score
// Example: GET /api/score, POST /api/score
app.use('/api/score', scoreRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.send('Typing Test API is running!');
});

// --- Start Server ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
