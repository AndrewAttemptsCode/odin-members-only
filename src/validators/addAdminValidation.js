const db = require('../../db/queries');
const { body } = require('express-validator');

const addAdminValidation = [
  body('username')
    .trim()
    .custom(async (username) => {
      const user = await db.getUser(username);
      if (!user) {
        throw new Error('Username does not exist.'); 
      }
      return true;
    })
  ,
  
  body('passcode')
    .trim()
    .custom((passcode) => {
      if (passcode !== process.env.ADMIN_PASSCODE) {
        throw new Error('Incorrect passcode');
      }
      return true;
    })
];

module.exports = { addAdminValidation };