const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publishedYear: { type: Number },
    genre: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
