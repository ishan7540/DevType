/**
 * routes/score.js
 * Routes for managing user scores.
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Score = require('../models/Score');

/**
 * @route   GET /api/score/history
 * @desc    Get user's score history
 * @access  Private
 */
router.get('/history', protect, async (req, res) => {
    try {
        const scores = await Score.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @route   POST /api/score
 * @desc    Save a new score and update high score if applicable
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
    try {
        const { wpm, accuracy, mode, duration } = req.body;

        if (typeof wpm !== 'number') {
            return res.status(400).json({ message: 'WPM must be a number' });
        }

        // Save to history
        const newScore = await Score.create({
            user: req.user._id,
            wpm,
            accuracy,
            mode,
            duration
        });

        // Check if new score is higher than existing high score (only for general high score tracking)
        // We might want to track high scores per mode/duration later, but for now keep the simple one.
        let isNewHighScore = false;
        if (wpm > req.user.highScore) {
            req.user.highScore = wpm;
            await req.user.save();
            isNewHighScore = true;
        }

        res.json({
            message: isNewHighScore ? 'New high score!' : 'Score saved',
            highScore: req.user.highScore,
            score: newScore
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
