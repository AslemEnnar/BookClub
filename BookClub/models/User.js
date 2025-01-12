const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema); // Create the model

module.exports = User;
