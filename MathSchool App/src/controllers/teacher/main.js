const store = require('store');

//Informacoes gerais 
var info = {
    title: "Pagina Inicial"
};

//Prototipo: Main Page - Teacher
const mainPage = (req, res) => {
    const user = store.get('user');
    res.render('teacher/teacherMainPage', { user, info });
};

module.exports = {
    mainPage
}