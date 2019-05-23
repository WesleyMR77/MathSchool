var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MathSchool' })
});

router.get('/conteudo', function (req, res, next) {
  res.render('conteudo', { title: 'Conteúdo' });
});

router.get('/mostrarConteudo', function (req, res, next) {
  res.render('mostrarConteudo', { title: 'Mostrar Conteúdo' });
});

router.get('/cadastrarConteudo', function (req, res, next) {
  res.render('cadastrarConteudo', { title: 'Cadastrar Conteúdo' });
});

router.get('/login', function (req, resp, next) {
  resp.render('login', { title: 'Login' });
})

router.get('/cadastro', function (req, resp, next) {
  resp.render('cadastro', { title: 'Cadastro' });
})

router.get('/guiaEstudo', function (req, resp, next) {
  resp.render('guiaEstudo', { title: 'Guia de Estudo' });
})

router.get('/mostrarGuiaEstudo', function (req, resp, next) {
  resp.render('mostrarGuiaEstudo', { title: 'Mostrar Guia' });
})

router.get('/cadastrarGuiaEstudo', function (req, resp, next) {
  resp.render('cadastrarGuiaEstudo', { title: 'Cadastrar Guia' });
})

router.get('/questionario', function (req, resp, next) {
  resp.render('questionario', { title: 'Questionário' });
})

router.get('/mostrarQuestionario', function (req, resp, next) {
  resp.render('mostrarQuestionario', { title: 'Mostrar Questionário' });
})

router.get('/cadastrarQuestionario', function (req, resp, next) {
  resp.render('cadastrarQuestionario', { title: 'Cadastrar Questionário' });
})

router.get('/questao', function (req, resp, next) {
  resp.render('questao', { title: 'Questão' });
})

router.get('/mostrarQuestao', function (req, resp, next) {
  resp.render('mostrarQuestao', { title: 'Mostrar Questão' });
})

router.get('/cadastrarQuestao', function (req, resp, next) {
  resp.render('cadastrarQuestao', { title: 'Cadastrar Questão' });
})

module.exports = router;
