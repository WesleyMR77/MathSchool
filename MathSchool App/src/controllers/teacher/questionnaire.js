const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Questionarios",
    user: null
};

//Prototipo: Questionnaire - Teacher
const questionnairePage = async (req, res) => {
    const questionnaires = await api.list('questionnaires');
    var myQuestionnaires = [];
    questionnaires.forEach(element => {
        if(element.author == user.name){
            myQuestionnaires.push(element);
        }
    });
    res.render('teacher/teacherQuestionnaire', { questionnaires, myQuestionnaires, info });
};

//Prototipo: Questionnaire - Teacher - Questionnaire ID
const viewQuestionnaire = async (req, res) => {
    const questionnaire = await api.get('questionnaires', req.params.id);
    res.render('student/studentQuestionID', { questionnaire, info });
};

//Listar questionario
const getQuestionnaire = async (req, res) => {
    const search = req.body.search;
    const AllQuestionnaires = await api.list('questionnaires');
    var questionnaires = []; 
    var myQuestionnaires = [];
    AllQuestionnaires.forEach(element => {
        if(element.name == search || element.author == search){
            questionnaires.push(element);
        }
        if(element.author == user.name){
            myQuestionnaires.push(element);
        }
    });
    res.render('teacher/teacherStudyGuide', { questionnaires, myQuestionnaires, info });
};

//Prototipo: Questionnaire - Teacher - Create Questionnaire
const createQuestionnairePage = async (req, res) => {
    const questions = await api.list('questions');
    res.render('teacher/createQuestionnaire', { questions, info});
};

//Criar questionario
const createQuestionnaire = async (req, res) => {
    await api.createPost('questionnaires', {
        name: req.body.name,
        subject: req.body.subject,
        questions: questionnaire.questions,
        author: user.name
    });
    res.redirect('teacher/questionnaire')
};

//Apagar questionario
const deleteQuestionnaire = async (req, res) => {
    await api.deleteItem('questionnaires', req.params.id);
    res.redirect('teacher/questionnaire');
}; 

module.exports = {
    questionnairePage,
    getQuestionnaire,
    viewQuestionnaire,
    createQuestionnairePage,
    createQuestionnaire,
    deleteQuestionnaire
}