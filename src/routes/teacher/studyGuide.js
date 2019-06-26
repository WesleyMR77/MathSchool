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
router.get('/update/:id', teacher.updateGuidePage);
router.post('/update/:id', teacher.updateGuide);
router.get('/update/:id/add/:type/:materialId', teacher.addUpdateTrail);
router.get('/update/:id/remove/:materialId', teacher.removeUpdateTrail);
router.get('/create', teacher.createGuidePage);
//router.post('/create', teacher.getMaterial);
router.get('/create/add/:type/:id', teacher.addCreationTrail);
router.get('/create/remove/:id', teacher.removeCreationTrail);
router.post('/create', teacher.createGuide);
router.get('/delete/:id', teacher.deleteGuide);

module.exports = router;