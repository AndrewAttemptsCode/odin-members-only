const { Router } = require('express');
const indexController = require('../controllers/indexController');
const isAuthAndMember = require('../validators/isAuthAndMember');

const indexRoute = Router();

indexRoute.get('/', indexController.getIndex);
indexRoute.get('/create-message', isAuthAndMember, indexController.getCreateMessage);

module.exports = indexRoute;

// TODO post route for insert into messages table