const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const user = require('../controllers/user');

//Configurando rotas
router.get('/login', user.loginPage);
router.get('/sign', user.signPage);

module.exports = router;