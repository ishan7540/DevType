/**
 * models/Score.js
 * Mongoose schema for storing score history.
 */

const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wpm: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        enum: ['text', 'code'],
        required: true
    },
    duration: {
        type: Number,
        enum: [15, 30, 60],
        required: true
    }
}, {
    timestamps: true
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
