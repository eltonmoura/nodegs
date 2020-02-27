/**
 * Rotas que precisam de autenticação
 */
var express = require('express');
var router = express.Router();

const UserController = require('../src/controllers/UserController');
const AuthController = require('../src/controllers/AuthController');

// Incluir aqui as Classes Controllers que herdam de BaseController
const crudlControllers = [
  { basePath: '/api/users', controller: UserController },
];

// Rotas básicas
const crudlRouters = [
  { http: 'post',   path: '/',    method: 'create' },
  { http: 'get',    path: '/:id', method: 'read' },
  { http: 'patch',  path: '/:id', method: 'update' },
  { http: 'delete', path: '/:id', method: 'delete' },
  { http: 'get',    path: '/',    method: 'list' },
];

for (const c of crudlControllers) {
  for (const r of crudlRouters) {
    router[r.http](c.basePath + r.path, c.controller[r.method]);
  }
}

// Demais rotas
router.get('/api/auth/me', AuthController.me);

module.exports = router;
