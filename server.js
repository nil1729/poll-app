require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const connectDB = require('./config/db');
const passportConfig = require('./config/passport');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Database Connect
connectDB();

// Body Parser Setup
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 500,
});
app.use(limiter);
app.use(cors());
app.enable('trust proxy');

// Session Setup
app.use(
	session({
		resave: false,
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
	})
);

// Connect Flash
app.use(flash());
app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

// Passport Setup
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
	res.render('main/index', {
		user: req.user,
	});
});
app.use('/survey', require('./routes/survey'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));

// PORT listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
	console.log(`Server started on port ${PORT}`);
});
