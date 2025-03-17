const bcrypt = require('bcryptjs');
const db = require('../../db/queries');

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