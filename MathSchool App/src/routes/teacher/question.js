const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/question');

//Configurando rotas
router.get('/', teacher.questionPage);
router.post('/', teacher.getQuestion);
router.get('/:id', teacher.viewQuestion);
router.get('/create', teacher.createQuestionPage);
router.post('/create', teacher.createQuestion);
router.get('/delete/:id', teacher.deleteQuestion);

module.exports = router;