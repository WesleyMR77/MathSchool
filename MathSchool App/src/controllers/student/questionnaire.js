const api = require('../../services/api');
const store = require('store');

//Prototipo: Questionnaire - Student
const questionnairePage = async (req, res) => {
    const user = store.get('user');
    const questionnaires = await api.list('questionnaires');
    res.render('student/studentQuestionnaire', { questionnaires, user });
};

//Prototipo: Questionnaire - Student - Question ID
const viewQuestion = async (req, res) => {
    const user = store.get('user');
    const questionnaire = await api.get('questionnaires', req.params.id);
    const question = await api.get('questions', questionnaire.questions[req.params.number]);
    res.render('student/studentQuestionID', { user, questionnaire, question });
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

module.exports = {
    questionnairePage,
    getQuestionnaire,
    viewQuestion
}