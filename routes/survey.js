const express = require('express');
const router = express.Router();
const SurveyItem = require('../models/SurveyItem');
const smileyRating = [
    {'emoji': '&#128533', 'text': 'Extremely Unsatisfied'},
    {'emoji': '&#128577', 'text': 'Unsatisfied'},
    {'emoji': '&#128528', 'text': 'Neutral'},
    {'emoji': '&#128522', 'text': 'Satisfied'},
    {'emoji': '&#128512', 'text': 'Extremely Satisfied'}
];

router.get('/create', async (req, res) => {
    res.render('main/create');
});

router.post('/create', async (req, res) => {
    const {QType, QText, options} = req.body;
    try {
        let newQuestion = new SurveyItem({
            QType,
            QText,
            options
        });
        newQuestion = await newQuestion.save();
        res.json({newQuestion});   
    } catch (e) {
        console.log(e);
         res.json({error: 'Server Error'});
    }
});


router.get('/response', async(req, res) => {
    try {
        const survey = await SurveyItem.find();
        res.render('main/poll', {survey, smileyRating});
    } catch (e) {
        console.log(e);
        res.json({error: 'Server Error'});
    }
});


router.post('/response', async(req, res) => {
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
    res.json({msg: 'Success'});
});

router.get('/survey-data', async (req, res) => {
    try {
        const surveys = await SurveyItem.find();
        res.json(surveys);
    } catch (e) {
        console.log(e);
        res.json({msg: 'Server Error'});
    }
});

router.get('/analyze', async (req, res) => {
    try {
        const surveys = await SurveyItem.find();
        res.render('main/analyze', {surveys});
    } catch (e) {
        console.log(e);
        res.json({msg: 'Server Error'});
    }
});
module.exports = router;