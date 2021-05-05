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
            const newTweet = new Tweet({
                author: req.body.id,
                body: req.body.body,
                reply_to: req.params.id
            });
            newTweet.save().then(() => {
                User.updateOne({ _id: req.body.id }, { $push: { tweets: newTweet } }, () => {
                    Tweet.updateOne({ _id: req.params.id }, { $push: { replies: newTweet } }, () => {
                        res.json(newTweet);
                    });
                });
            });
        })
        .catch(err => res.status(404).send('Tweet could not be found.'));
});

module.exports = router;