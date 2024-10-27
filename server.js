const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
require('dotenv').config();
require('./config/database');

// Controllers

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const UsersController = require('./controllers/users.js');
const app = express();
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.set('view engine ' , 'ejs')
app.use(addUserToViews);
app.use(passUserToView);
// Public Routes
app.get('/', async (req, res) => {
  if (req.session.user) {
   
    res.redirect(`/users/${req.session.user._id}/applications`);
  } else {
  
    res.render('index.ejs');
  }
});

app.get('/', users.ejs.index);
res.render

app.get('/users/:id', users.ejs.show);



app.get('/protected', async (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.sendStatus(404);
    // res.send('Sorry, no guests allowed.');
  }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods',foodsController);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});
