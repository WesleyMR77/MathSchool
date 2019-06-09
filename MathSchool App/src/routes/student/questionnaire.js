const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/questionnaire');

//Configurando rotas
router.get('/', student.questionnairePage);
router.post('/', student.getQuestionnaire);
router.get('/:questionnaireID/:questionID', student.startQuestionnaire);
router.post('/:questionnaireID/:questionID', student.nextQuestion);

module.exports = router;