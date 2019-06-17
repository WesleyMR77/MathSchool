const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/main');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.isStudent);

//Configurando rotas
router.get('/', student.mainPage);

module.exports = router;