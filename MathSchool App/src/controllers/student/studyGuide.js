const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Guia de Estudos",
    user: null
};

//Prototipo: Study Guide - Student
const studyGuidesPage = async (req, res) => {
    const guides = await api.list('studyGuides');
    res.render('student/studentStudyGuide', { guides, info });
};

//Listar guia de estudo
const getStudyGuide = async (req, res) => {
    const search = req.body.search;
    const AllGuides = await api.list('studyGuides');
    var guides = []; 
    AllGuides.forEach(element => {
        if(element.name == search || element.author == search){
            guides.push(element);
        }
    });
    info.user = store.get('user');
    res.render('student/studentStudyGuide', { guides, info });
};

//Prototipo: Study Guide - Student - Study Guide ID
const viewStudyGuide = async (req, res) => {
    const guide = await api.get('studyGuides', req.params.id);
    info.user = store.get('user');
    res.render('student/studentStudyGuideID', { guide, info });
};

//Visualizar conteudo do guia
const viewContent = async (req, res) => {
    const guide = await api.get('studyGuides', req.params.guideID);
    const content = await api.get('contents' + req.params.id);
    info.user = store.get('user');
    res.render('student/studentStudyGuideContent', { guide, content, info });
};

//Visualizar questionario do guia
const viewQuestionnaire = async (req, res) => {
    const guide = await api.get('studyGuides', req.params.guideID);
    const questionnaire = await api.get('questionnaires', req.params.id);
    const question = await api.get('questions', questionnaire.questions[req.params.number]);
    info.user = store.get('user');
    res.render('student/studentQuestionID', { guide, questionnaire, question, info });
};

module.exports = {
    studyGuidesPage,
    viewStudyGuide,
    getStudyGuide,
    viewContent,
    viewQuestionnaire
}