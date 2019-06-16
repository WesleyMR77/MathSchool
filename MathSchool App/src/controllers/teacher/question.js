const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Questoes",
    user: null
};

//Prototipo: Questions - Teacher
const questionPage = async (req, res) => {
    const questions = await api.list('questions');
    var myQuestions = []
    questions.forEach(element => {
        if(element.author == user.name){
            myQuestions.push(element);
        }
    });
    res.render('teacher/teacherQuestion', { questions, myQuestions, info });
};

//Listar questao
const getQuestion = async (req, res) => {
    const search = req.body.search;
    const AllQuestions = await api.list('questions');
    var questions = []; 
    var myQuestions = [];
    AllQuestions.forEach(element => {
        if(element.name == search || element.author == search){
            questions.push(element);
        }
        if(element.author == user.name){
            myQuestions.push(element);
        }
    });
    res.render('teacher/teacherQuestion', { questions, myQuestions, info });
};

//Visualizar a questao
const viewQuestion = async (req, res) => {
    const question = await api.get('questions' + req.params.id);
    res.render('teacher/teacherQuestionID', { question, info });
};

//Prototipo: Questions - Teacher - Create Question
const createQuestionPage = (req, res) => {
    res.render('teacher/teacherCreateQuestion', { info });
};

//Criar Questao
const createQuestion = async (req, res) => {
    await api.createPost('questions', {
        name: req.body.name,
        subject: req.body.subject,
        text: req.body.text,
        optA: document.querySelector('#optionA').text,
        optB: document.querySelector('#optionB').text,
        optC: document.querySelector('#optionC').text,
        optD: document.querySelector('#optionD').text,
        optE: document.querySelector('#optionE').text,
        answer: req.body.options.selected,
        author: user.name
    });
    res.redirect('/teacher/teacherQuestion');
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