const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');


// Standard Register GET
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// // Standard Register POST
router.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try {
        let newUser = new User({
            firstName,
            lastName,
            email,
            password
        });
        newUser.password = await bcrypt.hash(newUser.password, 10);
        newUser = await newUser.save();
        res.json({newUser});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Standard LOGIN GET
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Standard Login POST
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/dashboard'
}),(req, res) => {});


// page for rendeing Oauth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Call back URL
router.get('/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
    res.redirect('/users/dashboard');
});

// Logout Route
router.get('/logout', async (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;