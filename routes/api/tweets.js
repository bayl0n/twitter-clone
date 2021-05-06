const express = require('express');
const router = express.Router();

const Tweet = require('../../models/tweet');
const User = require('../../models/user');

// @route   GET api/tweets
// @desc    Get all tweet
// @access  Public
router.get('/', (req, res) => {
    Tweet.find()
        .then(tweets => res.json(tweets))
        .catch(() => res.status(404)
            .json({ success: false }));
});

// @route   POST api/tweets
// @desc    Create a new tweet
// @access  Public
router.post('/', (req, res) => {
    // Find the author and get author details
    User.findOne({ _id: req.body.id }, (err, user) => {
        if (err) return res.status(404).json({ msg: err });
        console.log(user);

        const newTweet = new Tweet({
            author: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            body: req.body.body,
        });

        // Save tweet to database then add it to user's tweets
        newTweet.save()
            .then(() => {
                User.updateOne({ _id: user._id }, { $push: { tweets: newTweet } }, () => {
                    res.json(newTweet);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

});

// @route   POST api/tweets/reply/:id
// @desc    Reply to a tweet
// @access  Public
router.post('/reply/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => {
            if (!tweet) return res.status(404).send('Requested tweet could not be found.');
            User.findOne({ _id: req.body.id }, (err, user) => {
                if (!user) return res.status(404).json({ msg: 'User could not be found' });
                const newTweet = new Tweet({
                    reply_to: req.params.id,
                    author: {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    },
                    body: req.body.body,
                });
                newTweet.save().then(tweet => {
                    Tweet.updateOne({ _id: req.params.id }, { $push: { replies: tweet._id } }, () => {
                        res.json(newTweet);
                    });
                });
            });
        });
});

// @route   GET api/tweets/replies/:id
// @desc    Get all replies to a tweet
// @access  Public
router.get('/replies/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => {
            if (!tweet) return res.status(404).send('Requested tweet could not be found.');
            Tweet.find({ _id: { $in: tweet.replies } }, (err, tweets) => {
                res.json(tweets);
            });
        });
});

// @route   GET api/tweets/replyto/:id
// @desc    Returns tweet if requested tweet is replying to it
// @access  Public
router.get('/replyto/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then((tweet) => {
            if (!tweet) return res.status(404).send('Requested tweet could not be found.');
            Tweet.findOne({ _id: tweet.reply_to }, (err, tweet) => {
                if (err) return res.status(400).send('Requested tweet isn\'t replying to any tweet');

                res.json(tweet);
            });
        });
});

module.exports = router;