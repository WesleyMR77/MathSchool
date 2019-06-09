const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/content');

//Configurando rotas
router.get('/', student.contentsPage);
router.post('/', student.getContent);
router.get('/:id', student.viewContent);

module.exports = router;