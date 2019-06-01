const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Configurando Servidor
app.use(express.json());
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

//Requerindo Rotas
const user = require('./src/routes/user');

//Configurando Rotas
app.use('/user', user);

//Determinando a porta automaticamente
const port = process.env.PORT || 3000

//Configurando pagina inicial
app.get('/', async (request, response) => { 
    response.render('/public/views/master/login') //Fix it
})

//Inicializando Servidor
app.listen(port, (err) => {
    if (err) {
        console.log('error:', err)
    } else {
        console.log('MathSchool App working on port:', port)
    }
})
