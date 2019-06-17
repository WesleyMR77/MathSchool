const store = require('store');

//Informacoes gerais 
var info = {
    title: "Pagina Inicial",
    user: null
};

//Prototipo: Main Page - Student
const mainPage = (req, res) => {
    info.user = store.get('user');
    res.render('student/studentMainPage', { info });
};

module.exports = {
    mainPage
}