const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/queries');
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUser(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      } 

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });      
      } 

      return done(null, user);

    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
  try {
    const user = await db.deserializeUser(userID);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;