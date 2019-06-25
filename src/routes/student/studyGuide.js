const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/studyGuide');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.isStudent);

//Configurando rotas
router.get('/', student.studyGuidesPage);
router.post('/', student.getStudyGuide);
router.get('/:id', student.viewStudyGuide);
router.get('/:guideID/content/:id', student.viewContent);
router.get('/:guideID/questionnaire/:id/:number', student.viewQuestionnaire);
router.post('/:guideID/questionnaire/:id/:number', student.correctQuestion);

module.exports = router;