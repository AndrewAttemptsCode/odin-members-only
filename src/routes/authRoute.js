const { Router } = require('express');
const authController = require('../controllers/authController');

const authRoute = Router();

authRoute.get('/register', authController.register);

module.exports = authRoute;