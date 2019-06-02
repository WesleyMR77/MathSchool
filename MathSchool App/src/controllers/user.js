const api = require('../api');

const loginPage = (req, res) => {
    res.render('user/login');
};

const signPage = (req, res) => {
    res.render('user/signIn');
};

module.exports = {
    loginPage,
    signPage
};