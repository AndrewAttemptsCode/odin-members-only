const getIndex = (req, res) => {
  res.render('index', { title: 'Members Club', user: req.user });
}

const getCreateMessage = (req, res) => {
  res.render('newmessage', { title: 'Create New Message' });
}

module.exports = { getIndex, getCreateMessage };