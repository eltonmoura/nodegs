/**
 * Rotas que não precisam de autenticação
 */
var express = require('express');
var router = express.Router();

const AuthController = require('../src/controllers/AuthController');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express API' });
});

// Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/logout', AuthController.logout);

module.exports = router;
