const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');

const getIndex = (req, res) => {
  res.render('index', { title: 'Members Club', user: req.user });
}

const getCreateMessage = (req, res) => {
  res.render('newmessage', { title: 'Create New Message' });
}

const postCreateMessage = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const userID = req.user.id;

  await db.createMessage(userID, title, text);
  res.redirect('/');
})

module.exports = { getIndex, getCreateMessage, postCreateMessage };