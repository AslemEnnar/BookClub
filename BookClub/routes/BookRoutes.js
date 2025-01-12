const express = require('express');
const Book = require('../models/Book'); // Import Book model
const router = express.Router();

// Create a new book
router.post('/books', async (req, res) => {
    const { title, author, description, publishedYear, genre } = req.body;

    if (!title || !author) {
        return res.status(400).send('Title and author are required');
    }

    try {
        const newBook = new Book({
            title,
            author,
            description,
            publishedYear,
            genre
        });

        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).send('Error creating book');
    }
});

// Get all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find(); // Get all books from MongoDB
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});

// Get a single book by ID
router.get('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id); // Find the book by its ID
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Error fetching book');
    }
});

// Update a book by ID
router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, publishedYear, genre } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            description,
            publishedYear,
            genre
        }, { new: true }); // `new: true` returns the updated book

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).send('Error updating book');
    }
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id); // Delete the book by ID
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Error deleting book');
    }
});

module.exports = router;
