const { Router } = require('express');
const authController = require('../controllers/authController');

const authRoute = Router();

authRoute.get('/register', authController.getRegister);
authRoute.post('/register', authController.postRegister);

module.exports = authRoute;