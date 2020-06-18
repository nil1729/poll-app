const mongoose = require('mongoose');
const surveyItemSchema = mongoose.Schema({
    QText:{
        type: String,
        required: true,
    },
    QType:{
        type: String,
        required: true,
    },
    options:[{
        type: String,
        default: null
    }],
    responses:[
        {
            type: String,
            default: null       
        }
    ],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("SurveyItem", surveyItemSchema);