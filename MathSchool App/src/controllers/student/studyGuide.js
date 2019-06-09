const api = require('../../services/api');
const user = require('../user');

//Prototipo: Study Guide - Student
const studyGuidesPage = async (req, res) => {
    const profile = user.getAuthUser;
    const guides = await api.list('studyGuides');
    res.render('student/studentStudyGuide', { guides, profile });
};

//Prototipo: Study Guide - Student - Study Guide ID
const viewStudyGuide = async (req, res) => {
    const profile = getAuthUser;
    const guide = await api.get('studyGuides', req.params.id);
    res.render('student/studentStudyGuideID');
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
    const profile = user.getAuthUser;
    res.render('student/studentStudyGuide', { guides, profile });
};

module.exports = {
    studyGuidesPage,
    viewStudyGuide,
    getStudyGuide
}