const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/studyGuide');

//Configurando rotas
router.get('/', student.studyGuidesPage);
router.post('/', student.getStudyGuide);
router.get('/:id', student.viewStudyGuide);

module.exports = router;