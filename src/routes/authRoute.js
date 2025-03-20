const { Router } = require('express');
const authController = require('../controllers/authController');
const { registerValidation } = require('../validators/registerValidation');
const passport = require('passport');
const isAuth = require('../validators/isAuth');

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

module.exports = authRoute;
