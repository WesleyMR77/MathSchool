const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Guia de Estudos",
    user: null
};

//Verificador para criacao de guia
var firstTime = true;

//Verificar criacao de trilha
const createTrail = (first) => {
    if(first){
        const trail = [];
        store.set('trail', trail);
        firstTime = false;
        return trail
    }else{
        return store.get('trail');
    }
};

//Prototipo: Study Guide - Teacher
const studyGuidesPage = async (req, res) => {
    info.user = store.get('user');
    const guides = await api.list('studyGuides');
    var myGuides = [];
    guides.forEach(element => {
        if(element.author == info.user.name){
            myGuides.push(element);
        }
    });
    res.render('teacher/teacherStudyGuide', { guides, myGuides, info });
};

//Listar guia de estudo
const getStudyGuide = async (req, res) => {
    info.user = store.get('user');
    const search = req.body.search;
    const AllGuides = await api.list('studyGuides');
    var guides = []; 
    var myGuides = [];
    if(search != ""){
        AllGuides.forEach(element => {
            if(element.name == search || element.author == search){
                guides.push(element);
            }
            if(element.author == info.user.name && (element.name == search || element.author == search)){
                myGuides.push(element);
            }
        });
    }else{
        AllGuides.forEach(element => {
            guides.push(element);
            
            if(element.author == info.user.name){
                myGuides.push(element);
            }
        });
    };
    res.render('teacher/teacherStudyGuide', { guides, myGuides, info });
};

//Prototipo: Study Guide - Teacher - Study Guide ID
const viewStudyGuide = async (req, res) => {
    const guide = await api.get('studyGuides', req.params.id);
    info.user = store.get('user');
    res.render('teacher/teacherStudyGuideID', { guide, info });
};

//Prototipo: Study Guide - Teacher - Create Guide
const createGuidePage = async (req, res) => {
    const questionnaires = await api.list('questionnaires');
    const contents = await api.list('contents');
    var materials = [];
    contents.forEach(element => {
        materials.push({
            id: element.id,
            name: element.name,
            subject: element.subject,
            author: element.author,
            type: "contents"
        })
    });
    questionnaires.forEach(element => {
        materials.push({
            id: element.id,
            name: element.name,
            subject: element.subject,
            author: element.author,
            type: "questionnaires"
        })
    });
    const trail = createTrail(firstTime);
    info.user = store.get('user');
    res.render('teacher/teacherCreateStudyGuide', { materials, info, trail });
};

//Pesquisar conteudo ou questionario no cadastro de guia
const getMaterial = async (req, res) => {
    const search = req.body.search;
    const AllQuestionnaires = await api.list('questionnaires');
    const AllContents = await api.list('contents');
    var questionnaires = [];
    var contents = [];
    var materials = [];
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
    };
    if(search != ""){
        AllContents.forEach(element => {
            if(element.name == search || element.author == search){
                contents.push(element);
            }
        });
    }else{
        AllContents.forEach(element => {
            contents.push(element);
        });
    };
    contents.forEach(element => {
        materials.push({
            identificator: element.id,
            name: element.name,
            subject: element.subject,
            author: element.author,
            type: "contents"
        })
    });
    questionnaires.forEach(element => {
        materials.push({
            identificator: element.id,
            name: element.name,
            subject: element.subject,
            author: element.author,
            type: "questionnaires"
        })
    });
    const trail = createTrail(firstTime);
    info.user = store.get('user');
    res.render('teacher/teacherCreateStudyGuide', { materials, info, trail });
};

//Adicao de material na trilha
const addTrail = async (req, res) => {
    var material = await api.get(req.params.type, req.params.id);
    material.type = req.params.type;
    var trail = store.get('trail');
    trail.push(material);
    store.remove('trail');
    store.set('trail', trail);
    res.redirect('/teacher/study-guide/create');
};

//Remocao de material da trilha
const removeTrail = async (req, res) => {
    var trail = store.get('trail');
    for (let index = 0; index < trail.length; index++) {
        if(trail[index].id == req.params.id){
            trail.splice(index, 1);
            break;
        }
    }
    store.remove('trail');
    store.set('trail', trail);
    res.redirect('/teacher/study-guide/create');
};

//Criar Guia de Estudo
const createGuide = async (req, res) => {
    info.user = store.get('user');
    await api.createPost('studyGuides', {
        name: req.body.name,
        subject: req.body.subject,
        trail: store.get('trail'),
        author: info.user.name
    });
    store.remove('trail');
    firstTime = true;
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
    getMaterial,
    addTrail,
    removeTrail,
    createGuide,
    deleteGuide
}