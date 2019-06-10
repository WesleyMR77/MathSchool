const store = require('store');

//Prototipo: Main Page - Teacher
const mainPage = (req, res) => {
    const user = store.get('user');
    res.render('teacher/teacherMainPage', { user });
};

module.exports = {
    mainPage
}