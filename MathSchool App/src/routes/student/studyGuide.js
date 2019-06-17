const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/studyGuide');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.getAuthUser, security.isStudent);

//Configurando rotas
router.get('/', student.studyGuidesPage);
router.post('/', student.getStudyGuide);
router.get('/:id', student.viewStudyGuide);
router.get('/:guideID/:id', student.viewContent);
router.get('/:guideID/:id/:number', student.viewQuestionnaire);


module.exports = router;