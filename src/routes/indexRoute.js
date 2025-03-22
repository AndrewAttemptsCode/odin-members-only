const { Router } = require('express');
const indexController = require('../controllers/indexController');
const isAuthAndMember = require('../validators/isAuthAndMember');

const indexRoute = Router();

indexRoute.get('/', indexController.getIndex);
indexRoute.get('/create-message', isAuthAndMember, indexController.getCreateMessage);
indexRoute.post('/create-message', isAuthAndMember, indexController.postCreateMessage);

module.exports = indexRoute;
