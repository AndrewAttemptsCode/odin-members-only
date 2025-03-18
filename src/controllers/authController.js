const bcrypt = require('bcryptjs');
const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const getRegister = (req, res) => {
  res.render('register', { title: 'Register Account' });
}

const postRegister = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('register', {
      title: 'Register Account',
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
  res.redirect('/'); // '/auth/login' when route created or account created confirmation page
})

module.exports = { getRegister, postRegister };

