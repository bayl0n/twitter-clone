require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const MONGOURI = process.env.MONGOURI;

// Allow API to read json
app.use(express.json());

const PORT = process.env.PORT || 8080;

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const User = mongoose.model('User', UserSchema, 'users');

// API
app.get('/users', (req, res) => {
    User.find().then(items => res.json(items))
});

app.post('/users', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        age: req.body.age
    });

    newUser.save().then(item => res.json(item));
});

app.delete('/users/id/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
});

// Conenct to databse and run server
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB server...')
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
});
