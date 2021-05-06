const express = require('express');
const router = express.Router();

const User = require('../../models/user');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(() => res.status(404)
            .json({ success: false }));
});

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // Check for duplicates
    User.findOne({ $or: [{ username: newUser.username }, { email: newUser.email }] })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists.' });

            // Save unique user
            newUser.save().then(user => res.json(user));
        });

});

// @route   PATCH api/users/follow/:id
// @desc    Follow another user
// @access  Public
router.patch('/follow/:id', (req, res) => {
    if (req.body.id === req.params.id) return res.status(400).json({ msg: 'Rejected self-follow' });

    // Check if the user is already following requested id
    User.findOne({ $and: [{ _id: req.body.id }, { following: req.params.id }] }).then(user => {
        if (user) return res.status(400).json({ msg: 'Already following user' });
        // Add requested id to user's following list
        User.updateOne({ _id: req.body.id }, { $push: { following: req.params.id } }, () => {
            // Added current user to requested user's followers list
            User.updateOne({ _id: req.params.id }, { $push: { followers: req.body.id } })
                .then(() => {
                    res.sendStatus(200);
                });
        });
    });
});

// @route   PATCH api/users/unfollow/:id
// @desc    Unfollow another user
// @access  Public
router.patch('/unfollow/:id', (req, res) => {
    if (req.body.id === req.params.id) return res.status(400).json({ msg: 'Rejected self-unfollow' });

    // Check if the user is following requested id
    User.findOne({ $and: [{ _id: req.body.id }, { following: req.params.id }] }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User isn\'t followed' });
        // Remove requested id from user's following list
        User.updateOne({ _id: req.body.id }, { $pull: { following: req.params.id } }, () => {
            // Remove current user from requested user's followers list
            User.updateOne({ _id: req.params.id }, { $pull: { followers: req.body.id } })
                .then(() => {
                    res.sendStatus(200);
                });
        });
    });
});


// @route   PATCH api/users/follow
// @desc    Clear all follows and followers for all users
// @access  Public
router.patch('/follow', (req, res) => {

    User.updateMany({ $or: [{ followers: { $size: 0 } }, { following: { $size: 0 } }] }, { $set: { followers: [], following: [] } },
        (err, result) => {
            console.log('Affected: ', result);
        }).then((result) => {
            res.send(result);
        });
});

// @route   DELETE api/users/id/:id
// @desc    Delete a user by id
// @access  Public
router.delete('/id/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;