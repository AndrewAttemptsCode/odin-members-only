const register = (req, res) => {
  res.render('register', { title: 'Register Account' });
}

module.exports = { register };