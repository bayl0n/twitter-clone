const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema, 'users');