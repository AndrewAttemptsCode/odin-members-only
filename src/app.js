const path = require('path');
const express = require('express');
const pgPool = require('../db/pool');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('../config/passport');
const authRouter = require('./routes/authRoute');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(session({
  store: new pgSession({
    pool : pgPool,
    tableName : 'user_sessions'
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app.use(passport.session());

app.get('/', (req, res) => {
  res.send('test');
})

app.use('/auth', authRouter);

module.exports = app;