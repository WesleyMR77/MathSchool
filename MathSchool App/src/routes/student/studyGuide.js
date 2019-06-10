const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/studyGuide');

//Configurando rotas
router.get('/', student.studyGuidesPage);
router.post('/', student.getStudyGuide);
router.get('/:id', student.viewStudyGuide);
router.get('/:guideID/:id', student.viewContent);
router.get('/:guideID/:id/:number', student.viewQuestionnaire);


module.exports = router;