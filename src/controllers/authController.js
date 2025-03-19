const bcrypt = require('bcryptjs');
const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const getRegister = (req, res) => {
  res.render('register', { title: 'Register an Account' });
}

const postRegister = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('register', {
      title: 'Register an Account',
      errors: errors.array(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email
    });
  }

  const { first_name, last_name, username, email, password, confirmPassword } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.createUser(first_name, last_name, username, email, hashedPassword);
  res.redirect('/auth/login');
})

const getLogin = (req, res) => {
  res.render('login', { title: 'Log In' });
}

module.exports = { getRegister, postRegister, getLogin };

// auth check middleware, goes next() if auth -> req.isAuthenticated()
// goes back to login route if not auth

