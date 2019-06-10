const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const student = require('../../controllers/student/questionnaire');

//Configurando rotas
router.get('/', student.questionnairePage);
router.post('/', student.getQuestionnaire);
router.get('/:id/:number', student.viewQuestion);

module.exports = router;