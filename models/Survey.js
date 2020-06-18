const mongoose = require('mongoose');
const surveySchema = mongoose.Schema({
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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Survey", surveySchema);