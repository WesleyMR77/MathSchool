const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Questionários",
    user: null
};

//Prototipo: Questionnaire - Student
const questionnairePage = async (req, res) => {
    const questionnaires = await api.list('questionnaires');
    info.user = store.get('user');
    res.render('student/studentQuestionnaire', { questionnaires, info });
};

//Listar questionario
const getQuestionnaire = async (req, res) => {
    const search = req.body.search;
    const AllQuestionnaires = await api.list('questionnaires');
    var questionnaires = []; 
    if(search != ""){
        AllQuestionnaires.forEach(element => {
            if(element.name == search || element.author == search){
                questionnaires.push(element);
            }
        });
    }else{
        AllQuestionnaires.forEach(element => {
            questionnaires.push(element);
        });
    }
    info.user = store.get('user');
    res.render('student/studentStudyGuide', { questionnaires, info });
};

//Prototipo: Questionnaire - Student - Question ID
const viewQuestion = async (req, res) => {
    const questionnaire = await api.get('questionnaires', req.params.id);
    const question = await api.get('questions', questionnaire.questions[req.params.number].id);
    info.user = store.get('user');
    res.render('student/studentQuestionID', { questionnaire, question, info });
};

//Corrigir questao
const correctQuestion = async (req, res) => {
    const answer = req.body.options;
    const questionnaire = await api.get('questionnaires', req.params.id);
    const question = await api.get('questions', questionnaire.questions[req.params.number].id);
    var correction;
    if(answer == question.answer){
        correction = true;
    }else{
        correction = false;
    }
    info.user = store.get('user');
    res.render('student/studentCorrectQuestion', { questionnaire, question, correction, info });
};

module.exports = {
    questionnairePage,
    getQuestionnaire,
    viewQuestion,
    correctQuestion
}