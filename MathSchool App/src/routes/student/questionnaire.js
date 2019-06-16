const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/questionnaire');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.getAuthUser, security.isStudent);

//Configurando rotas
router.get('/', student.questionnairePage);
router.post('/', student.getQuestionnaire);
router.get('/:id/:number', student.viewQuestion);

module.exports = router;