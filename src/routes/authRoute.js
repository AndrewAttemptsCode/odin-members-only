const { Router } = require('express');
const authController = require('../controllers/authController');
const { registerValidation } = require('../validators/registerValidation');
const passport = require('passport');
const isAuth = require('../validators/isAuth');
const isAdmin = require('../validators/isAdmin');

const authRoute = Router();

authRoute.get('/register', authController.getRegister);
authRoute.post('/register', registerValidation, authController.postRegister);

authRoute.get('/login', authController.getLogin);
authRoute.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

authRoute.get('/join-club', isAuth, authController.getJoinClub);
authRoute.post('/join-club', authController.postJoinClub);

authRoute.get('/logout', isAuth, authController.logout);

authRoute.get('/delete-message/:messageID', isAuth, isAdmin, authController.deleteMessage);

module.exports = authRoute;

