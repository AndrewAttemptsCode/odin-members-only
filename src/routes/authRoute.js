const { Router } = require('express');
const authController = require('../controllers/authController');
const { registerValidation } = require('../validators/registerValidation');
const passport = require('passport');

const authRoute = Router();

authRoute.get('/register', authController.getRegister);
authRoute.post('/register', registerValidation, authController.postRegister);

authRoute.get('/login', authController.getLogin);
authRoute.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

module.exports = authRoute;