const { body } = require('express-validator');

const messageValidation = [
  body('messageTitle')
  .trim()
  .notEmpty().withMessage('Title is empty')
  .isLength({ max: 20 }).withMessage('Title exceeds max char length (20)')
  ,

  body('messageText')
  .trim()
  .notEmpty().withMessage('Message is empty')
  .isLength({ max: 250 }).withMessage('Message exceeds max char length (250)')
  ,
]

module.exports = { messageValidation };