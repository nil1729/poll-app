const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const config = require('config');
const connectDB = require('./config/db');

// Database Connect
connectDB();

// Body Parser Setup
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Session Setup
app.use(session({
    resave: false,
    secret: config.get('sessionSecret'),
    saveUninitialized: false
}));

// Connect Flash
app.use(flash());
app.use((req, res, next)=> {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/survey', require('./routes/survey'));


// PORT listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});