const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/questionnaire');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.isTeacher);

//Configurando rotas
router.get('/', teacher.questionnairePage);
router.post('/', teacher.getQuestionnaire);
router.get('/:id', teacher.viewQuestionnaire);
router.get('/create', teacher.createQuestionnairePage);
router.post('/create', teacher.createQuestionnaire);
router.get('/delete/:id', teacher.deleteQuestionnaire);

module.exports = router;