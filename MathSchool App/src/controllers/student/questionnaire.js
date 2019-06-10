const api = require('../../services/api');
const store = require('store');

//Prototipo: Questionnaire - Student
const questionnairePage = async (req, res) => {
    const user = store.get('user');
    const questionnaires = await api.list('questionnaires');
    res.render('student/studentQuestionnaire', { questionnaires, user });
};

//Prototipo: Questionnaire - Student - Question ID
const startQuestionnaire = async (req, res) => {
    const user = store.get('user');
    const questionnaire = await api.get('questionnaires', req.params.questionnaireID);
    const question = await api.get('questions', questionnaire.questions[0]);
    res.render('student/studentQuestionID', { user, questionnaire, question });
};

//Proxima questao do questionario
const nextQuestion = async (req, res) => {
    const user = store.get('user');
    const questionnaire = await api.get('questionnaires', req.params.questionnaireID);
    const currentQuestion = await api.get('questions', req.params.questionID);
    var questionPos;
    for(var i = 0; i < questionnaire.questions.length; i++){
        if(currentQuestion == questionnaire.questions[i]){
            questionPos = i;
            break;
        };
    };
    if(questionPos+1 == questionnaire.questions.length){
        questionnairePage;
    }else{
        const newQuestion = await api.get('questions', questionnaire.questions[questionPos]);
        res.render('student/studentQuestionID', { user, questionnaire, newQuestion });
    }
};

//Listar questionario
const getQuestionnaire = async (req, res) => {
    const search = req.body.search;
    const AllQuestionnaires = await api.list('questionnaires');
    let questionnaires = []; 
    AllQuestionnaires.forEach(element => {
        if(element.name == search || element.author == search){
            questionnaires.push(element);
        }
    });
    const user = store.get('user');
    res.render('student/studentStudyGuide', { questionnaires, user });
};

//Corrigir questao
const correctQuestion = async () => {
    
};

module.exports = {
    questionnairePage,
    startQuestionnaire,
    nextQuestion,
    getQuestionnaire,
    correctQuestion
}