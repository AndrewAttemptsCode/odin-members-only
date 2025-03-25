const path = require('path');
const express = require('express');
const pgPool = require('../db/pool');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('../config/passport');
const authRouter = require('./routes/authRoute');
const indexRouter = require('./routes/indexRoute');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
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

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).send(
    err.message || 'Internal Server Error'
  );
});

module.exports = app;