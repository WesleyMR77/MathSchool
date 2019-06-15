const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Guia de Estudos"
};

//Prototipo: Study Guide - Teacher
const studyGuidesPage = async (req, res) => {
    const user = store.get('user');
    const guides = await api.list('studyGuides');
    var myGuides = [];
    guides.forEach(element => {
        if(element.author == user.name){
            myGuides.push(element);
        }
    });
    res.render('teacher/teacherStudyGuide', { guides, myGuides, user, info });
};

//Listar guia de estudo
const getStudyGuide = async (req, res) => {
    const search = req.body.search;
    const AllGuides = await api.list('studyGuides');
    var guides = []; 
    var myGuides = [];
    AllGuides.forEach(element => {
        if(element.name == search || element.author == search){
            guides.push(element);
        }
        if(element.author == user.name){
            myGuides.push(element);
        }
    });
    const user = store.get('user');
    res.render('teacher/teacherStudyGuide', { guides, myGuides, user, info });
};

//Prototipo: Study Guide - Teacher - Study Guide ID
const viewStudyGuide = async (req, res) => {
    const user = store.get('user');
    const guide = await api.get('studyGuides', req.params.id);
    res.render('teacher/teacherStudyGuideID', { guide, user, info });
};

//Prototipo: Study Guide - Teacher - Create Guide
const createGuidePage = async (req, res) => {
    const user = store.get('user');
    const questionnaires = await api.list('questionnaires');
    const contents = await api.list('contents');
    res.render('teacher/teacherCreateGuide', { user, questionnaires, contents, info });
};

//Criar Guia de Estudo
const createGuide = async (req, res) => {
    const user = store.get('user');
    await api.createPost('studyGuides', {
        name: req.body.name,
        subject: req.body.subject,
        trail: guide.trail,
        author: user.name
    });
    res.redirect('/teacher/study-guide');
};

//Apagar guia de estudo
const deleteGuide = async (req, res) => {
    await api.deleteItem('studyGuides', req.params.id);
    res.redirect('/teacher/study-guide');
}

module.exports = {
    studyGuidesPage,
    getStudyGuide,
    viewStudyGuide,
    createGuidePage,
    createGuide,
    deleteGuide
}