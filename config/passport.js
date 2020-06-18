const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

module.exports = async (passport) => {
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
    passport.use(new GoogleStrategy({
        clientID: config.get('googleClientID'),
        clientSecret: config.get('googleClientSecret'),
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, cb) => {
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                avatar: profile.photos[0].value,
                email: profile.emails[0].value
            };
            try{
                let user = await User.findOne({email: newUser.email});
                // let user = await User.findOne({googleID: newUser.googleID});
                if(!user){
                    user = new User(newUser);
                    await user.save();
                    return cb(null, user);
                }else{
                    return cb(null, user);
                }
            }catch(e){
                console.log(e);
                return cb(e);
            }     
        }
    ));
    passport.serializeUser((user, cb)=>{
        return cb(null, user.id);
    });
    passport.deserializeUser((id, cb)=> {
        User.findById(id, (err, user)=> {
            return cb(err, user);
        });
    });
};