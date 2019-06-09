const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/main');

//Configurando rotas
router.get('/', teacher.mainPage);

module.exports = router;