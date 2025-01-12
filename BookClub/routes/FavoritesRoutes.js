const express = require('express');
const Favorites = require('../models/Favorites');  // Import the Favorites model
const User = require('../models/User');  // Import the User model to verify the user
const jwt = require('jsonwebtoken');  // To verify JWT token (for protected routes)

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).send('Invalid token.');
        }
        req.userId = decoded.userId;
        next();
    });
};

// Add a book to favorites
router.post('/favorite', verifyToken, async (req, res) => {
    const { bookId } = req.body;
    const userId = req.userId;

    if (!bookId) {
        return res.status(400).send('Book ID is required');
    }

    try {
        // Check if the book is already favorited
        const existingFavorite = await Favorites.findOne({ userId, bookId });

        if (existingFavorite) {
            return res.status(400).send('This book is already in your favorites');
        }

        // Add the book to the user's favorites
        const newFavorite = new Favorites({ userId, bookId });
        await newFavorite.save();

        res.status(201).json({ message: 'Book added to favorites', favorite: newFavorite });
    } catch (err) {
        console.error('Error adding book to favorites:', err);
        res.status(500).send('Error adding book to favorites');
    }
});

// Remove a book from favorites
router.delete('/unfavorite', verifyToken, async (req, res) => {
    const { bookId } = req.body;
    const userId = req.userId;

    if (!bookId) {
        return res.status(400).send('Book ID is required');
    }

    try {
        // Find and remove the favorite
        const favorite = await Favorites.findOneAndDelete({ userId, bookId });

        if (!favorite) {
            return res.status(404).send('Book not found in your favorites');
        }

        res.status(200).json({ message: 'Book removed from favorites' });
    } catch (err) {
        console.error('Error removing book from favorites:', err);
        res.status(500).send('Error removing book from favorites');
    }
});

// Get a user's favorite books
router.get('/favorites', verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        // Get all favorite books for the user
        const favorites = await Favorites.find({ userId }).populate('bookId', 'title author');  // Populate the book details
        
        if (favorites.length === 0) {
            return res.status(404).send('You have no favorite books');
        }

        res.status(200).json({ favorites });
    } catch (err) {
        console.error('Error fetching favorite books:', err);
        res.status(500).send('Error fetching favorite books');
    }
});

module.exports = router;
