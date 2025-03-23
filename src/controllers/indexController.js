const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const getIndex = (req, res) => {
  res.render('index', { user: req.user });
}

const getCreateMessage = (req, res) => {
  res.render('newmessage', { title: 'Create New Message', user: req.user });
}

const postCreateMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  const { messageTitle, messageText } = req.body;
  const userID = req.user.id;

  if (!errors.isEmpty()) {
    return res.status(400).render('newmessage', {
      title: 'Create New Message',
      errors: errors.array(),
      messageTitle: messageTitle,
      messageText: messageText,
      user: req.user
    });
  }

  await db.createMessage(userID, messageTitle, messageText);
  res.redirect('/');
})

module.exports = { getIndex, getCreateMessage, postCreateMessage };