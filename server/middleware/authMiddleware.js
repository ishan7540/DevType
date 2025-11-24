/**
 * middleware/authMiddleware.js
 * Middleware to protect routes that require authentication.
 * 
 * How it works:
 * 1. Checks for the 'Authorization' header in the request.
 * 2. Extracts the JWT token (Bearer <token>).
 * 3. Verifies the token using the secret key.
 * 4. If valid, attaches the user ID to the request object (req.user).
 * 5. If invalid or missing, returns a 401 Unauthorized error.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by ID from the decoded token
            // We exclude the password field from the result using .select('-password')
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
