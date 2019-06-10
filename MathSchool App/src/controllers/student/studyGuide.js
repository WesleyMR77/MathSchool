const api = require('../../services/api');
const store = require('store')

//Prototipo: Study Guide - Student
const studyGuidesPage = async (req, res) => {
    const user = store.get('user');
    const guides = await api.list('studyGuides');
    res.render('student/studentStudyGuide', { guides, user });
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

//Prototipo: Study Guide - Student - Study Guide ID
const viewStudyGuide = async (req, res) => {
    const user = store.get('user');
    const guide = await api.get('studyGuides', req.params.id);
    res.render('student/studentStudyGuideID', { guide, user });
};

//Visualizar conteudo/questionario do guia
const viewMaterial = async (req, res) => {
    const user = store.get('user');
    const guide = await api.get('studyGuides', req.params.guideID);
    if(req.params.type == "questionnaire"){
        const questionnaire = await api.get('questionnaires', req.params.id);
        const question = await api.get('questions', questionnaire.questions[0]);
        res.render('student/studentQuestionID', { user, guide, questionnaire, question });
    }
    if(req.params.type == "content"){
        const content = await api.get('contents/' + req.params.id);
        res.render('student/studentStudyGuideContent', { user, guide, content });
    }
};

//Proximo conteudo/questionario do guia
const nextMaterial = async (req, res) => {
    const user = store.get('user');
    const guide = await api.get('studyGuides', req.params.guideID);
    for(let i = 0; i < guide.trail.length; i++){
        if(guide.trail[i].id == req.params.id){
            if(i+1 == guide.trail.length){
                res.redirect('student/study-guide');
            }else{
                if(guide.trail[i+1].type == "questionnaire"){
                    res.render('')
                };
                if(guide.trail[i+1].type == "content")[

                ]
            }
        }
    }
};

//Proxima questao do questionario do guia
const nextQuestion = async (req, res) => {
    const user = store.get('user');
    const guide = await api.get('studyGuides', req.params.guideID);
    const questionnaire = await api.get('questionnaires', req.params.id);
    const currentQuestion = await api.get('questions', req.params.questionID);
    var questionPos;
    for(var i = 0; i < questionnaire.questions.length; i++){
        if(currentQuestion == questionnaire.questions[i]){
            questionPos = i;
            break;
        };
    };
    if(questionPos+1 == questionnaire.questions.length){
        //;
    }else{
        const newQuestion = await api.get('questions', questionnaire.questions[questionPos+1]);
        res.render('student/studentQuestionID', { user, guide, questionnaire, newQuestion });
    }
};

module.exports = {
    studyGuidesPage,
    viewStudyGuide,
    getStudyGuide,
    viewMaterial,
    nextMaterial,
    nextQuestion
}