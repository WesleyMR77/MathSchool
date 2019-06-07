const user = require('../user');

//Prototipo: Main Page - Student
const mainPage = (req, res) => {
    const profile = user.getAuthUser;
    res.render('student/studentMainPage', profile);
};

module.exports = {
    mainPage
}