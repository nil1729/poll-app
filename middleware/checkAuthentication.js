module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash('error', 'Kindly login first');
        res.redirect('/auth/login');
    }
};