const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Questionarios",
    user: null
};

//Prototipo: Questionnaire - Student
const questionnairePage = async (req, res) => {
    const questionnaires = await api.list('questionnaires');
    res.render('student/studentQuestionnaire', { questionnaires, info });
};

//Prototipo: Questionnaire - Student - Question ID
const viewQuestion = async (req, res) => {
    const questionnaire = await api.get('questionnaires', req.params.id);
    const question = await api.get('questions', questionnaire.questions[req.params.number]);
    res.render('student/studentQuestionID', { questionnaire, question, info });
};

//Listar questionario
const getQuestionnaire = async (req, res) => {
    const search = req.body.search;
    const AllQuestionnaires = await api.list('questionnaires');
    var questionnaires = []; 
    AllQuestionnaires.forEach(element => {
        if(element.name == search || element.author == search){
            questionnaires.push(element);
        }
    });
    res.render('student/studentStudyGuide', { questionnaires, info });
};

module.exports = {
    questionnairePage,
    getQuestionnaire,
    viewQuestion
}