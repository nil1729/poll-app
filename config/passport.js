const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = async () => {
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, cb)=> {
        try {
            const user = await User.findOne({email});
            if(!user){
                return cb(null, false, {message: 'Authentication Error'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return cb(null, false, {message: 'Authentication Error'});
            }
            return cb(null, user, {message: 'Successfully Signed in'});
        } catch (e) {
            console.log(e);
            return cb(e);
        }
    }));
    passport.serializeUser((user, cb)=>{
        return cb(null, user.id);
    });
    passport.deserializeUser((id, cb)=> {
        User.findById(id, (err, user)=> {
            return cb(err, user);
        });
    });
};