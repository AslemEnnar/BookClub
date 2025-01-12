const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true
    },
    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', // Reference to the Book model
        required: true
    }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
