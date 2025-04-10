const bcrypt = require('bcryptjs');
const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const getRegister = (req, res) => {
  if (req.user) {
    res.redirect('/');
  }
  res.render('register', { title: 'Register an Account', user: req.user });
}

const postRegister = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  const { first_name, last_name, username, email, password, confirmPassword } = req.body;
  
  if (!errors.isEmpty()) {
    return res.status(400).render('register', {
      title: 'Register an Account',
      errors: errors.array(),
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      user: req.user
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.createUser(first_name, last_name, username, email, hashedPassword);
  res.redirect('/auth/login');
})

const getLogin = (req, res) => {
  if (req.user) {
    res.redirect('/');
  }

  const error = req.query.error || '';

  res.render('login', { title: 'Log In', user: req.user, error });
}

const getJoinClub = (req, res) => {
  if (req.user.member_status) {
    res.redirect('/');
  }
  res.render('joinclub', { title: 'Join the club', user: req.user });
}

const postJoinClub = async (req, res) => {
  const { passcode } = req.body;
  const userID = req.user.id;

  if (passcode !== process.env.CLUB_PASSCODE) {
    return res.status(401).render('joinclub', {
      title: 'Join the club',
      user: req.user,
      error: 'Incorrect passcode'
    });
  }

  await db.updateMemberStatus(userID);
  res.redirect('/')
}

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageID } = req.params;
  await db.deleteMessage(messageID);
  res.redirect('/');
});

const getAddAdmin = (req, res) => {
  res.render('addadmin', { title: 'Add new Admin', user: req.user });
}

const postAddAdmin = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  const { username } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render('addadmin', {
      title: 'Add new Admin',
      errors: errors.array(),
      user: req.user
    })
  }
  
  await db.addAdmin(username);
  res.redirect('/');
});

module.exports = { getRegister, postRegister, getLogin, getJoinClub, postJoinClub, logout, deleteMessage, getAddAdmin, postAddAdmin };

