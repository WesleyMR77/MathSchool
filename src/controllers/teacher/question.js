const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Questões",
    user: null
};

//Prototipo: Questions - Teacher
const questionPage = async (req, res) => {
    info.user = store.get('user');
    const questions = await api.list('questions');
    var myQuestions = []
    questions.forEach(element => {
        if(element.author == info.user.name){
            myQuestions.push(element);
        }
    });
    res.render('teacher/teacherQuestion', { questions, myQuestions, info });
};

//Listar questao
const getQuestion = async (req, res) => {
    info.user = store.get('user');
    const search = req.body.search;
    const AllQuestions = await api.list('questions');
    var questions = []; 
    var myQuestions = [];
    if(search != ""){
        AllQuestions.forEach(element => {
            if(element.name == search || element.author == search){
                questions.push(element);
            }
            if(element.author == info.user.name && (element.name == search || element.author == search)){
                myQuestions.push(element);
            }
        });
    }else{
        AllQuestions.forEach(element => {
            questions.push(element);

            if(element.author == info.user.name){
                myQuestions.push(element);
            }
        });
    };
    res.render('teacher/teacherQuestion', { questions, myQuestions, info });
};

//Visualizar a questao
const viewQuestion = async (req, res) => {
    const question = await api.get('questions', req.params.id);
    info.user = store.get('user');
    res.render('teacher/teacherQuestionID', { question, info });
};

//Prototipo: Questions - Teacher - Create Question
const createQuestionPage = (req, res) => {
    info.user = store.get('user');
    res.render('teacher/teacherCreateQuestion', { info });
};

//Criar Questao
const createQuestion = async (req, res) => {
    info.user = store.get('user');
    const question = {
        name: req.body.name,
        subject: req.body.subject,
        text: req.body.text,
        A: req.body.optionA,
        B: req.body.optionB,
        C: req.body.optionC,
        D: req.body.optionD,
        E: req.body.optionE,
        answer: req.body.options,
        author: info.user.name
    };
    await api.createPost('questions', question);
    res.redirect('/teacher/question');
};

//Deletar questao
const deleteQuestion = async (req, res) => {
    await api.deleteItem('questions', req.params.id);
    res.redirect('/teacher/question');
};

module.exports = {
    questionPage,
    getQuestion,
    viewQuestion,
    createQuestionPage,
    createQuestion,
    deleteQuestion
};