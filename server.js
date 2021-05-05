require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 8080;

const userRoutes = require('./routes/api/users');
const tweetRoutes = require('./routes/api/tweets');

// Middleware
app.use(express.json());

// Apply routes
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);

// Connect to database and run server
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB server...');
        app.listen(PORT, () => {
            console.log(`Server started on port ${ PORT }`);
        });
    });