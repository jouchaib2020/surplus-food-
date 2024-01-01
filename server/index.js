/*** Importing modules ***/
const express = require('express');
const morgan = require('morgan');                                  // logging middleware
const cors = require('cors');


/*** init express and set-up the middlewares ***/
const app = express();
app.use(morgan('dev'));
app.use(express.json());


/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));


/*** Passport ***/

const passport = require('passport');                              // authentication middleware
const LocalStrategy = require('passport-local');                   // authentication strategy (username and password)

// Creating the session 
const session = require('express-session');
const { verify } = require('./auth');
const { router } = require('./routes/routes');

app.use(session({
  secret: "secret!",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(verify));

passport.serializeUser( (user, callback)=> callback(null, user)); // this user is id + username + name 

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser( (user, callback)=> callback(null, user)) // this will be available in req.user
  // e.g.: return userDao.getUserById(id).then(user => callback(null, user)).catch(err => callback(err, null));



/*** Users APIs ***/
app.use(router); // this is the router exported by routes.js



// Activating the server
const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
