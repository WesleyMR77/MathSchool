const express = require('express');
const security = require('../../controllers/security');

//Inicializando rotas
const router = express.Router();

//Requerindo controlador
const teacher = require('../../controllers/teacher/studyGuide');

//Configurando Middlewares de seguranca
router.use(security.verifyAuth, security.isTeacher);

//Configurando rotas
router.get('/', teacher.studyGuidesPage);
router.post('/', teacher.getStudyGuide);
router.get('/view/:id', teacher.viewStudyGuide);
router.get('/create', teacher.createGuidePage);
router.post('/create', teacher.createGuide);
router.get('/delete/:id', teacher.deleteGuide);

module.exports = router;