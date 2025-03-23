const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const getIndex = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages();
  
  const formattedMessages = await Promise.all(messages.map(async (message) => {
    const username = await db.getUserByID(message.user_id);
    const dateObj = new Date(message.timestamp);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);

    return {
      ...message,
      dateFormatted: `${day}/${month}/${year}`,
      username
    };
  }));
  
  res.render('index', { user: req.user, messages: formattedMessages });
});

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