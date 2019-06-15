const store = require('store');

//Informacoes gerais 
var info = {
    title: "Pagina Inicial"
};

//Prototipo: Main Page - Student
const mainPage = (req, res) => {
    const user = store.get('user')
    res.render('student/studentMainPage', { user, info });
};

module.exports = {
    mainPage
}