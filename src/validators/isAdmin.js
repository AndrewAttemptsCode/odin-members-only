const isAdmin = (req, res, next) => {
  if (req.user.admin) {
    return next();
  }
  res.redirect('/auth/login');
};

module.exports = isAdmin;