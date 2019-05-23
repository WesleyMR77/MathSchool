const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Configurando Servidor
app.use(express.json());
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded());

//Configurando Rotas

//Determinando a porta automaticamente
const port = process.env.PORT || 3000

//Inicializando Servidor
app.listen(port, (err) => {
    if (err) {
        console.log('error:', err)
    } else {
        console.log('MathSchool App working on port:', port)
    }
})

