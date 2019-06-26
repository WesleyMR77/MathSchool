const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Guia de Estudos",
    user: null
};

//Prototipo: Study Guide - Student
const studyGuidesPage = async (req, res) => {
    info.user = store.get('user');
    const guides = await api.list('studyGuides');
    res.render('student/studentStudyGuide', { guides, info });
};

//Listar guia de estudo
const getStudyGuide = async (req, res) => {
    const search = req.body.search;
    const AllGuides = await api.list('studyGuides');
    var guides = []; 
    if(search!=""){
        AllGuides.forEach(element => {
            if(element.name == search || element.author == search){
                guides.push(element);
            }
        });
    }else{
        AllGuides.forEach(element => {
            guides.push(element);
        });
    }
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
    var content;
    var number;
    for (let index = 0; index < guide.trail.length; index++) {
        if(guide.trail[index].id == req.params.id){
            content = guide.trail[index];
            number = index+1;
            break;
        }
    }
    info.user = store.get('user');
    res.render('student/studentStudyGuideContent', { guide, number, content, info });
};

//Visualizar questionario do guia
const viewQuestionnaire = async (req, res) => {
    const guide = await api.get('studyGuides', req.params.guideID);
    var questionnaire;
    var number;
    for (let index = 0; index < guide.trail.length; index++) {
        if(guide.trail[index].id == req.params.id){
            questionnaire = guide.trail[index];
            number = index+1;
            break;
        }
    }   
    const question = questionnaire.questions[req.params.number];
    info.user = store.get('user');
    res.render('student/studentStudyGuideQuestion', { guide, number, questionnaire, question, info });
};

//Corrigir questao
const correctQuestion = async (req, res) => {
    const guide = await api.get('studyGuides', req.params.guideID);
    const answer = req.body.options;
    var questionnaire;
    guide.trail.forEach(element => {
        if(element.id == req.params.id){
            questionnaire = element;
        }
    });    
    const question = questionnaire.questions[req.params.number];
    var correction;
    if(answer == question.answer){
        correction = true;
    }else{
        correction = false;
    }
    info.user = store.get('user');
    res.render('student/studentStudyGuideCorrectQuestion', { guide, questionnaire, question, correction, info });
};

module.exports = {
    studyGuidesPage,
    viewStudyGuide,
    getStudyGuide,
    viewContent,
    viewQuestionnaire,
    correctQuestion
}