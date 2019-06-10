const store = require('store');

//Prototipo: Main Page - Student
const mainPage = (req, res) => {
    const user = store.get('user')
    res.render('student/studentMainPage', { user });
};

module.exports = {
    mainPage
}