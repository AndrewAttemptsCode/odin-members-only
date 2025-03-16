const path = require('path');
const express = require('express');
const pg = require('pg');
const pgPool = require('../db/pool');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const LocalPassport = require('passport-local').Strategy;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
// app.use(passport.session());

// app.use(session({
//   store: new pgSession({
//     pool : pgPool,
//     tableName : 'user_sessions'
//   }),
//   secret: process.env.COOKIE_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
// }));


// TODO: set up passport serialize and deserialize

app.get('/', (req, res) => {
  res.send('test');
})

module.exports = app;