const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/main');

//Configurando rotas
router.get('/', student.mainPage);

module.exports = router;