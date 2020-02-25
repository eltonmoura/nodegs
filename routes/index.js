var express = require('express');
var router = express.Router();

const UserController = require('../src/controllers/UserController');

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

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
