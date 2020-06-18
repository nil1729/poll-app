const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Survey = require('../models/Survey');
const checkAuthentication = require('../middleware/checkAuthentication');
const moment = require('moment');


// User Dashboard
router.get('/dashboard', checkAuthentication, async (req, res) => {
    try {
        const surveys = await Survey.find({user: req.user}).sort({createdAt: -1});
        res.render('main/dashboard', {user: req.user, surveys});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// My Surveys
router.get('/survey/:id', async (req, res) => {
    try {
        const surveys = await Survey.find({user: req.params.id}).sort({createdAt: -1}).populate('user').populate('surveyQs').exec();
        const user = await User.findById(req.params.id);
        res.render('main/public', {surveys, user: req.user, owner: user});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Create
router.post('/survey', checkAuthentication, async (req, res) => {
    const {title} = req.body;
    try {
        let newSurvey = new Survey({
            title,
            user: req.user,
            showDate: moment(new Date()).format("MMMM Do YYYY")
        });
        newSurvey = await newSurvey.save();
        res.redirect('back');
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Update
router.put('/survey/:id', checkAuthentication, async (req, res) => {
    try{
        const {title} = req.body;
        await Survey.updateOne({_id: req.params.id}, {title});
        res.redirect('back');
    }catch(e){
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Delete
router.delete('/survey/:id', checkAuthentication, async (req, res) => {
    try{
        await Survey.findByIdAndDelete(req.params.id);
        res.redirect('back');
    }catch(e){
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

module.exports = router;