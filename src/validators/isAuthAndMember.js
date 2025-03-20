const isAuthAndMember = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }

  if (req.user.member_status === false) {
    return res.redirect('auth/join-club');
  }

  next();
}

module.exports = isAuthAndMember;