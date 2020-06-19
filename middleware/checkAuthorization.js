const Survey = require('../models/Survey');
module.exports = async (req, res, next) => {
    if(req.isAuthenticated()){
        try{
            const survey = await Survey.findById(req.params.id);
            if(survey.user.equals(req.user._id)){
                next();
            }else{
                req.flash('error', 'You are not authorized to do that');
                res.redirect('/survey/public');
            }
        }catch(e){
            console.log(e);
            req.flash('error', 'Sorry!! Server Error occurred');
            res.redirect('/');
        }
    }else{
        req.flash('error', 'Kindly login first');
        res.redirect('/auth/login');
    }
};