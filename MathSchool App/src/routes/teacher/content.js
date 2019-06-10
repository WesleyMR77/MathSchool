const express = require('express');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/content');

//Configurando rotas
router.get('/', teacher.contentsPage);
router.post('/', teacher.getContent);
router.get('/:id', teacher.viewContent);
router.get('/create', teacher.createContentPage);
router.post('/create', teacher.createContent);
router.get('/delete/:id', teacher.deleteContent);

module.exports = router;