const mongoose = require('mongoose');

// Tweet Schema
const TweetSchema = new mongoose.Schema({
    author: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require: true
        }
    },
    body: String,
    likes: {
        type: Number,
        default: 0
    },
    reply_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        default: null
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    posted_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tweet = mongoose.model('Tweet', TweetSchema, 'tweets');