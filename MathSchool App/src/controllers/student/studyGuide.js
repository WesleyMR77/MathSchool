const api = require('../../services/api');
const store = require('store')

//Prototipo: Study Guide - Student
const studyGuidesPage = async (req, res) => {
    const user = store.get('user');
    const guides = await api.list('studyGuides');
    res.render('student/studentStudyGuide', { guides, user });
};

//Prototipo: Study Guide - Student - Study Guide ID
const viewStudyGuide = async (req, res) => {
    const user = store.get('user');
    const guide = await api.get('studyGuides', req.params.id);
    res.render('student/studentStudyGuideID', { guide, user });
};

//Listar guia de estudo
const getStudyGuide = async (req, res) => {
    const search = req.body.search;
    const AllGuides = await api.list('studyGuides');
    let guides = []; 
    AllGuides.forEach(element => {
        if(element.name == search || element.author == search){
            guides.push(element);
        }
    });
    const user = store.get('user');
    res.render('student/studentStudyGuide', { guides, user });
};

module.exports = {
    studyGuidesPage,
    viewStudyGuide,
    getStudyGuide
}