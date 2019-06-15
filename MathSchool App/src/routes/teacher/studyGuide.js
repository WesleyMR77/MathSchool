const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/studyGuide');

//Configurando rotas
router.get('/', teacher.studyGuidesPage);
router.post('/', teacher.getStudyGuide);
router.get('/:id', teacher.viewStudyGuide);
router.get('/create', teacher.createGuidePage);
router.post('/create', teacher.createGuide);
router.get('/delete/:id', teacher.deleteGuide);

module.exports = router;