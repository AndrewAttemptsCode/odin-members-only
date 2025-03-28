const db = require('../../db/queries');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const getIndex = asyncHandler(async (req, res) => {
  const startTime = Date.now();
  
  const messages = await db.getAllMessages();
  
  console.log(`Get all messages took ${Date.now() - startTime}ms`);

  const formatStartTime = Date.now();

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

  console.log(`Message formatting took ${Date.now() - formatStartTime}ms`);
  console.log(`Total getIndex took ${Date.now() - formatStartTime}ms`);
  
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