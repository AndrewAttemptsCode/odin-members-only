const { Router } = require('express');
const authController = require('../controllers/authController');
const { registerValidation } = require('../validators/registerValidation');
const passport = require('passport');
const isAuth = require('../validators/isAuth');
const isAdmin = require('../validators/isAdmin');
const { addAdminValidation } = require('../validators/addAdminValidation');

const authRoute = Router();

authRoute.get('/register', authController.getRegister);
authRoute.post('/register', registerValidation, authController.postRegister);

authRoute.get('/login', authController.getLogin);
authRoute.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login?error=Invalid Username or Password'
}))

authRoute.get('/join-club', isAuth, authController.getJoinClub);
authRoute.post('/join-club', authController.postJoinClub);

authRoute.get('/logout', isAuth, authController.logout);

authRoute.get('/delete-message/:messageID', isAuth, isAdmin, authController.deleteMessage);

authRoute.get('/add-admin', isAuth, authController.getAddAdmin);
authRoute.post('/add-admin', isAuth, addAdminValidation, authController.postAddAdmin);

module.exports = authRoute;

