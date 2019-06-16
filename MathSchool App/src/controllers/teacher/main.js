const store = require('store');

//Informacoes gerais 
var info = {
    title: "Pagina Inicial",
    user: null
};

//Prototipo: Main Page - Teacher
const mainPage = (req, res) => {
    res.render('teacher/teacherMainPage', { info });
};

module.exports = {
    mainPage
}