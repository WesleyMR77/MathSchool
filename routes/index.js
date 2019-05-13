var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MathSchool' })
});

router.get('/conteudo', function (req, res, next) {
  res.render('conteudo', { title: 'Conteúdo' });

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

module.exports = router;
