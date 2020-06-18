const mongoose = require('mongoose');
const surveySchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    surveyQs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SurveyItem"
        }
    ],
    responses: {
        type: Number,
        required: true,
        default: 0
    },
    showDate: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Survey", surveySchema);