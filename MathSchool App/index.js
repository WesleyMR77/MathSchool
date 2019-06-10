const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Configurando Servidor
app.use(express.json());
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded());

//Configurando a pasta publica
app.use(express.static(__dirname + '/public'));

//Requerindo Rotas
const user = require('./src/routes/user');
const studentMain = require('./src/routes/student/main');
const studentContent = require('./src/routes/student/content');
const studentStudyGuide = require('./src/routes/student/studyGuide');
const studentQuestionnaire = require('./src/routes/student/questionnaire');
const teacherMain = require('./src/routes/teacher/main');
/*const teacherContent = require('./src/routes/teacher/content');
const teacherStudyGuide = require('./src/routes/teacher/studyGuide');
const teacherQuestionnaire = require('./src/routes/teacher/questionnaire');
const teacherQuestion = require('./src/routes/teacher/question')*/

//Configurando Rotas
app.use('/user', user);
app.use('/student', studentMain);
app.use('/student/content', studentContent);
app.use('/student/study-guide', studentStudyGuide);
app.use('/student/questionnaire', studentQuestionnaire);
app.use('/teacher', teacherMain);
/*app.use('/teacher/content', teacherContent);
app.use('/teacher/study-guide', teacherStudyGuide);
app.use('/teacher/questionnaire', teacherQuestionnaire);
app.use('/teacher/question', teacherQuestion);*/

//Determinando a porta automaticamente
const port = process.env.PORT || 3000

//Configurando pagina inicial
app.get('/', async (request, response) => { 
    response.redirect('/user/login');
})

//Inicializando Servidor
app.listen(port, (err) => {
    if (err) {
        console.log('error:', err)
    } else {
        console.log('MathSchool App working on port:', port)
    }
})

/*SEÇÃO DE TESTES DAS TELAS*/
app.get('/teacherContent', async (request, response) => { 
    response.render('teacher/teacherContent');
})

// PÁGINA ESTUDANTE


app.get('/studentStudyGuide', async (request, response) => { 
    response.render('student/studentStudyGuide');
})

app.get('/studentStudyGuideContent', async (request, response) => { 
    response.render('student/studentStudyGuideContent');
})
