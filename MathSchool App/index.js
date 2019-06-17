const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Configurando Servidor
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './public/views');
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
const teacherContent = require('./src/routes/teacher/content');
const teacherStudyGuide = require('./src/routes/teacher/studyGuide');
const teacherQuestionnaire = require('./src/routes/teacher/questionnaire');
const teacherQuestion = require('./src/routes/teacher/question');

//Configurando Rotas
app.use('/user', user);
app.use('/student', studentMain);
app.use('/student/content', studentContent);
app.use('/student/study-guide', studentStudyGuide);
app.use('/student/questionnaire', studentQuestionnaire);
app.use('/teacher', teacherMain);
app.use('/teacher/content', teacherContent);
app.use('/teacher/study-guide', teacherStudyGuide);
app.use('/teacher/questionnaire', teacherQuestionnaire);
app.use('/teacher/question', teacherQuestion);

//Determinando a porta automaticamente
const port = process.env.PORT || 3000

//Configurando pagina inicial
app.get('/', async (request, response) => { 
    response.redirect('/user/login');
});

//Inicializando Servidor
app.listen(port, (err) => {
    if (err) {
        console.log('error:', err)
    } else {
        console.log('MathSchool App working on port:', port)
    }
<<<<<<< HEAD
});

/*SEÇÃO DE TESTES DAS TELAS*/
app.get('/teacherContent', async (request, response) => { 
    response.render('teacher/teacherContent');
})

app.get('/teacherContentID', async (request, response) => { 
    response.render('teacher/teacherContentID');
})

app.get('/teacherCreateContent', async (request, response) => { 
    response.render('teacher/teacherCreateContent');
})

app.get('/teacherStudyGuide', async (request, response) => { 
    response.render('teacher/teacherStudyGuide');
})

app.get('/teacherStudyGuideID', async (request, response) => { 
    response.render('teacher/teacherStudyGuideID');
})

app.get('/teacherCreateStudyGuide', async (request, response) => { 
    response.render('teacher/teacherCreateStudyGuide');
})


app.get('/teacherQuestion', async (request, response) => { 
    response.render('teacher/teacherQuestion');
})

app.get('/teacherQuestionID', async (request, response) => { 
    response.render('teacher/teacherQuestionID');
})

app.get('/teacherCreateQuestion', async (request, response) => { 
    response.render('teacher/teacherCreateQuestion');
})


app.get('/teacherQuestionnaire', async (request, response) => { 
    response.render('teacher/teacherQuestionnaire');
})

app.get('/teacherQuestionnaireID', async (request, response) => { 
    response.render('teacher/teacherQuestionnaireID');
})

app.get('/teacherCreateQuestionnaire', async (request, response) => { 
    response.render('teacher/teacherCreateQuestionnaire');
})

// PÁGINA ESTUDANTE


app.get('/studentQuestionnaire', async (request, response) => { 
    response.render('student/studentQuestionnaire');
})

app.get('/studentQuestionID', async (request, response) => { 
    response.render('student/studentQuestionID');
})

app.get('/studentStudyGuideContent', async (request, response) => { 
    response.render('student/studentStudyGuideContent');
})

app.get('/studentMainPage', async (request, response) => { 
    response.render('student/studentMainPage');
})

app.get('/studentContentID', async (request, response) => { 
    response.render('student/studentContentID');
})

app.get('/studentContent', async (request, response) => { 
    response.render('student/studentContent');
})

app.get('/studentStudyGuide', async (request, response) => { 
    response.render('student/studentStudyGuide');
})

app.get('/studentStudyGuideID', async (request, response) => { 
    response.render('student/studentStudyGuideID');
})


=======
});
>>>>>>> 24ea92f0e92a8f1ba8c2fce11c13a329d1d430f9
