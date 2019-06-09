const user = require('../user');

//Prototipo: Main Page - Teacher
const mainPage = (req, res) => {
    const profile = user.getAuthUser;
    res.render('teacher/teacherMainPage', profile);
};

module.exports = {
    mainPage
}