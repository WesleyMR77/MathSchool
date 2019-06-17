const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/question');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.getAuthUser, security.isTeacher);

//Configurando rotas
router.get('/', teacher.questionPage);
router.post('/', teacher.getQuestion);
router.get('/:id', teacher.viewQuestion);
router.get('/create', teacher.createQuestionPage);
router.post('/create', teacher.createQuestion);
router.get('/delete/:id', teacher.deleteQuestion);

module.exports = router;