const bcrypt = require('bcryptjs');
const db = require('../../db/queries');
const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is empty')
    .customSanitizer(value =>
      value.map(firstName => firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase())
    ),
  
  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is empty')
    .customSanitizer(value =>
      value.map(lastName => lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase())
    )
    ,

  body('username')
    .trim()
    .notEmpty().withMessage('Username is empty')
    .matches(/^[a-zA-Z0-9]+$/).withMessage('Username: Letters and numbers only')
    .isLength({max: 30}).withMessage('Username: Max length of 30 characters')
    .custom(async (value) => {
      const username = await db.getUserByUsername(value);
      if (username) {
        throw new Error('Username already exists');
      }
      return true;
    })
    ,

  body('email')
    .trim()
    .toLowerCase()
    .notEmpty().withMessage('Email is empty')
    .isEmail().withMessage('Email formatting incorrect')
    .custom(async (value) => {
      const email = await db.getUserByEmail(value);
      if (email) {
        throw new Error('Email already in use');
      }
      return true;
    })
    ,

  body('password')
    .trim()
    .notEmpty().withMessage('Password is empty')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters long')
    ,

  body('confirmPassword')
    .trim()
    .notEmpty().withMessage('Confirm password is empty')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true;
    })
];

const getRegister = (req, res) => {
  res.render('register', { title: 'Register Account' });
}

const postRegister = async (req, res) => {
  const { first_name, last_name, username, email, password, confirmPassword } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.createUser(first_name, last_name, username, email, hashedPassword);
  res.redirect('/'); // '/auth/login' when route created or account created confirmation page
}

module.exports = { getRegister, postRegister };