const express = require('express');
const router = express.Router();
const SurveyItem = require('../models/SurveyItem');
const checkAuthentication = require('../middleware/checkAuthentication');
const Survey = require('../models/Survey');
const smileyRating = [
    {'emoji': '&#128533', 'text': 'Extremely Unsatisfied'},
    {'emoji': '&#128577', 'text': 'Unsatisfied'},
    {'emoji': '&#128528', 'text': 'Neutral'},
    {'emoji': '&#128522', 'text': 'Satisfied'},
    {'emoji': '&#128512', 'text': 'Extremely Satisfied'}
];

// PUBLIC Surveys
router.get('/public', async (req, res) => {
    try {
        const surveys = await Survey.find().sort({createdAt: -1}).populate('user').populate('surveyQs').exec();
        res.render('main/public', {surveys, user: req.user, view: 'public'});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Question add ( GET )
router.get('/create/:id', checkAuthentication, async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        res.render('main/create', {survey, user: req.user});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Question Add ( POST ) 
router.post('/create/:id', checkAuthentication, async (req, res) => {
    const {QType, QText, options} = req.body;
    try {
        let newQuestion = new SurveyItem({
            QType,
            QText,
            options
        });
        newQuestion = await newQuestion.save();
        let survey = await Survey.findById(req.params.id);
        survey.surveyQs.push(newQuestion);
        await Survey.updateOne({_id: survey._id}, survey);
        res.redirect(`/survey/preview/${survey.id}`);
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Priview
router.get('/preview/:id', async(req, res) => {
    try {
        const survey = await Survey.findById(req.params.id).populate('user').populate('surveyQs').exec();
        res.render('main/poll', {survey, user: req.user, view: 'preview', smileyRating});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Response ( GET ) 
router.get('/response/:id', async(req, res) => {
    try {
        const survey = await Survey.findById(req.params.id).populate('user').populate('surveyQs').exec();
        res.render('main/poll', {survey, user: req.user, view: 'response', smileyRating});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// Survey Response ( POST ) 
router.post('/response/:id', async(req, res) => {
    try {
        const response = req.body;
        const keys = Object.keys(response);
        keys.forEach(async key => {
            let surveyItem = await SurveyItem.findById(key);
            const data = response[key];
            if(typeof data === 'object'){
                surveyItem.responses.push(...data);
            }else{
                surveyItem.responses.push(data);
            }
            surveyItem = await SurveyItem.updateOne({_id: surveyItem._id}, surveyItem);
        });
        let survey = await Survey.findById(req.params.id);
        survey.responses = survey.responses + 1;
        await Survey.updateOne({_id: req.params.id}, survey);
        res.redirect('/survey/public');   
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});

// frontend Client Side Rendering
router.get('/survey-data/:id', checkAuthentication, async (req, res) => {
    try {
        const surveys = await SurveyItem.find();
        res.json(surveys);
    } catch (e) {
        console.log(e);
        res.json({msg: 'Server Error'});
    }
});

router.get('/analyze/:id', checkAuthentication, async (req, res) => {
    try {
        const survey = await Survey.findById({_id: req.params.id}).populate('user').populate('surveyQs').exec();
        res.render('main/analyze', {survey, id: survey._id, user: req.user, view: 'analyze'});
    } catch (e) {
        console.log(e);
        res.json({msg: 'Server Error'});
    }
});
module.exports = router;