const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Questionários",
    user: null
};

//Verificador para criacao de guia
var firstTime = true;

//Verificar criacao de trilha
const createList = (first) => {
    if(first){
        store.remove('list');
        const list = [];
        store.set('list', list);
        firstTime = false;
        return list
    }else{
        return store.get('list');
    }
};

//Prototipo: Questionnaire - Teacher
const questionnairePage = async (req, res) => {
    firstTime = true;
    info.user = store.get('user');
    const questionnaires = await api.list('questionnaires');
    var myQuestionnaires = [];
    questionnaires.forEach(element => {
        if(element.author == info.user.name){
            myQuestionnaires.push(element);
        }
    });
    res.render('teacher/teacherQuestionnaire', { questionnaires, myQuestionnaires, info });
};

//Prototipo: Questionnaire - Teacher - Questionnaire ID
const viewQuestionnaire = async (req, res) => {
    const questionnaire = await api.get('questionnaires', req.params.id);
    info.user = store.get('user');
    res.render('teacher/teacherQuestionnaireID', { questionnaire, info });
};

//Listar questionario
const getQuestionnaire = async (req, res) => {
    info.user = store.get('user');
    const search = req.body.search;
    const AllQuestionnaires = await api.list('questionnaires');
    var questionnaires = []; 
    var myQuestionnaires = [];
    if(search != ""){
        AllQuestionnaires.forEach(element => {
            if(element.name == search || element.author == search){
                questionnaires.push(element);
            }
            if(element.author == info.user.name && (element.name == search || element.author == search)){
                myQuestionnaires.push(element);
            }
        });
    }else{
        AllQuestionnaires.forEach(element => {
            questionnaires.push(element);

            if(element.author == info.user.name){
                myQuestionnaires.push(element);
            }
        });
    };
    res.render('teacher/teacherQuestionnaire', { questionnaires, myQuestionnaires, info });
};

//Prototipo: Questionnaire - Teacher - Create Questionnaire
const createQuestionnairePage = async (req, res) => {
    const questions = await api.list('questions');
    const list = createList(firstTime);
    for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if(questions[i].id == list[j].id){
                questions.splice(i, 1);
            }
        }
    }
    info.user = store.get('user');
    res.render('teacher/teacherCreateQuestionnaire', { questions, list, info });
};

//Pesquisar pergunta
const getQuestion = async (req, res) => {
    info.user = store.get('user');
    const search = req.body.search;
    const AllQuestions = await api.list('questions');
    var questions = []; 
    const list = createList(firstTime);
    if(search != ""){
        AllQuestions.forEach(element => {
            if(element.name == search || element.author == search){
                questions.push(element);
            }
        });
    }else{
        AllQuestions.forEach(element => {
            questions.push(element);
        });
    };
    for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if(questions[i].id == list[j].id){
                questions.splice(i, 1);
            }
        }
    }
    res.render('teacher/teacherCreateQuestionnaire', { questions, list, info });
};

//Adicionar pergunta
const addQuestion = async (req, res) => {
    const question = await api.get('questions', req.params.id);
    var list = store.get('list');
    list.push(question);
    store.remove('list');
    store.set('list', list);
    res.redirect('/teacher/questionnaire/create');
};

//Remover questao
const removeQuestion = async (req, res) => {
    var list = store.get('list');
    for (let index = 0; index < list.length; index++) {
        if(list[index].id == req.params.id){
            list.splice(index, 1);
            break;
        }
    }
    store.remove('list');
    store.set('list', list);
    res.redirect('/teacher/questionnaire/create');
};

//Criar questionario
const createQuestionnaire = async (req, res) => {
    await api.createPost('questionnaires', {
        name: req.body.name,
        subject: req.body.subject,
        questions: store.get('list'),
        author: info.user.name
    });
    store.remove('list');
    firstTime = true;
    res.redirect('/teacher/questionnaire')
};

//Apagar questionario
const deleteQuestionnaire = async (req, res) => {
    await api.deleteItem('questionnaires', req.params.id);
    res.redirect('/teacher/questionnaire');
}; 

module.exports = {
    questionnairePage,
    getQuestionnaire,
    viewQuestionnaire,
    createQuestionnairePage,
    getQuestion,
    addQuestion,
    removeQuestion,
    createQuestionnaire,
    deleteQuestionnaire
}