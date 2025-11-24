/**
 * models/User.js
 * Mongoose schema for the User.
 * 
 * This file defines the structure of the User document in MongoDB.
 * It also handles password hashing before saving the user to the database.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users have the same email
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    highScore: {
        type: Number,
        default: 0 // Default score is 0 for new users
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

/**
 * Pre-save hook
 * This function runs BEFORE a user document is saved to the database.
 * We use it to hash the password if it has been modified (or is new).
 */
userSchema.pre('save', async function (next) {
    // 'this' refers to the user document being saved

    // If the password hasn't been modified, skip hashing
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt (random data to make the hash unique)
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Helper method to compare passwords
 * Used during login to check if the entered password matches the hashed password.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
