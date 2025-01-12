const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the db connection
const app = express();
const cors = require('cors');


dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import routes
const authRoutes = require('./routes/AuthRoutes');
const bookRoutes = require('./routes/BookRoutes'); 
const favoritesRoutes = require('./routes/FavoritesRoutes');

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api/favorites', favoritesRoutes); 

// Root route
app.get('/', (req, res) => {
    console.log('Request received');
    res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Application listening on port ${port}!`);
});

