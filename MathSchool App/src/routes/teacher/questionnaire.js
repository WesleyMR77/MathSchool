const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/questionnaire');

//Configurando rotas
router.get('/', teacher.questionnairePage);
router.post('/', teacher.getQuestionnaire);
router.get('/:id', teacher.viewQuestionnaire);
router.get('/create', teacher.createQuestionnairePage);
router.post('/create', teacher.createQuestionnaire);
router.get('/delete/:id', teacher.deleteQuestionnaire);

module.exports = router;