const express = require('express');
const router = express.Router();
const SurveyItem = require('../models/SurveyItem');
// const checkAuthentication = require('../middleware/checkAuthentication');
const checkAuthorization = require('../middleware/checkAuthorization');
const Survey = require('../models/Survey');
const smileyRating = [
	{
		emoji: '&#128533',
		text: 'Extremely Unsatisfied',
	},
	{
		emoji: '&#128577',
		text: 'Unsatisfied',
	},
	{
		emoji: '&#128528',
		text: 'Neutral',
	},
	{
		emoji: '&#128522',
		text: 'Satisfied',
	},
	{
		emoji: '&#128512',
		text: 'Extremely Satisfied',
	},
];

// PUBLIC Surveys
router.get('/public', async (req, res) => {
	try {
		const surveys = await Survey.find()
			.sort({
				createdAt: -1,
			})
			.populate('user')
			.populate('surveyQs')
			.exec();
		res.render('main/public', {
			surveys,
			user: req.user,
			view: 'public',
		});
	} catch (e) {
		console.log(e);
		req.flash('error', 'Sorry!! Server Error occurred');
		res.redirect('back');
	}
});

// Survey Question add ( GET )
router.get('/create/:id', checkAuthorization, async (req, res) => {
	try {
		const survey = await Survey.findById(req.params.id);
		res.render('main/create', {
			survey,
			user: req.user,
		});
	} catch (e) {
		console.log(e);
		req.flash('error', 'Sorry!! Server Error occurred');
		res.redirect('back');
	}
});

// Survey Question Add ( POST )
router.post('/create/:id', checkAuthorization, async (req, res) => {
	const { QType, QText, option__1, option__2, option__3, option__4 } = req.body;
	try {
		let options;
		if (option__1) {
			options = [option__1, option__2, option__3, option__4];
		}
		let newQuestion = new SurveyItem({
			QType,
			QText,
			options,
		});
		newQuestion = await newQuestion.save();
		let survey = await Survey.findById(req.params.id);
		survey.surveyQs.push(newQuestion);
		await Survey.updateOne(
			{
				_id: survey._id,
			},
			survey
		);
		req.flash('success', 'Question added Successfully');
		res.redirect(`/survey/preview/${survey.id}`);
	} catch (e) {
		console.log(e);
		req.flash('error', 'Sorry!! Server Error occurred');
		res.redirect('back');
	}
});

// Survey Priview
router.get('/preview/:id', async (req, res) => {
	try {
		const survey = await Survey.findById(req.params.id)
			.populate('user')
			.populate('surveyQs')
			.exec();
		res.render('main/poll', {
			survey,
			user: req.user,
			view: 'preview',
			smileyRating,
		});
	} catch (e) {
		console.log(e);
		req.flash('error', 'Sorry!! Server Error occurred');
		res.redirect('back');
	}
});

// Survey Response ( GET )
router.get('/response/:id', async (req, res) => {
	try {
		const survey = await Survey.findById(req.params.id)
			.populate('user')
			.populate('surveyQs')
			.exec();
		res.render('main/poll', {
			survey,
			user: req.user,
			view: 'response',
			smileyRating,
		});
	} catch (e) {
		console.log(e);
		res.json({
			error: 'Server Error',
		});
	}
});

// Survey Response ( POST )
router.post('/response/:id', async (req, res) => {
	try {
		const response = req.body;
		const keys = Object.keys(response);

		for (key in keys) {
			let surveyItem;

			if (keys[key].includes('$')) {
				surveyItem = await SurveyItem.findById(keys[key].split('$')[0]);
			} else {
				surveyItem = await SurveyItem.findById(keys[key]);
			}

			const data = response[keys[key]];
			if (typeof data === 'object') {
				surveyItem.responses.push(...data);
			} else {
				surveyItem.responses.push(data);
			}
			surveyItem = await SurveyItem.updateOne(
				{
					_id: surveyItem._id,
				},
				surveyItem
			);
		}
		let survey = await Survey.findById(req.params.id);
		survey.responses = survey.responses + 1;
		await Survey.updateOne(
			{
				_id: req.params.id,
			},
			survey
		);
		req.flash('success', 'Response recorded Successfully');
		res.redirect('/survey/public');
	} catch (e) {
		console.log(e);
		req.flash('error', 'Sorry!! Server Error occurred');
		res.redirect('back');
	}
});

// frontend Client Side Rendering
router.get('/survey-data/:id', checkAuthorization, async (req, res) => {
	try {
		const surveys = await Survey.findById({
			_id: req.params.id,
		})
			.populate('user')
			.populate('surveyQs')
			.exec();
		res.json(surveys);
	} catch (e) {
		console.log(e);
		res.json({
			msg: 'Server Error',
		});
	}
});

router.get('/analyze/:id', checkAuthorization, async (req, res) => {
	try {
		const survey = await Survey.findById({
			_id: req.params.id,
		})
			.populate('user')
			.populate('surveyQs')
			.exec();
		res.render('main/analyze', {
			survey,
			id: survey._id,
			user: req.user,
			view: 'analyze',
		});
	} catch (e) {
		console.log(e);
		req.flash('error', 'Sorry!! Server Error occurred');
		res.redirect('back');
	}
});
module.exports = router;
// Export it... just to remove CommitError
