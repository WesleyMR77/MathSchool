const store = require('store');
const firebase = require('../services/firebase');
const api = require('../services/api');

const verifyAuth = (req, res, next) => {
    if(firebase.auth().currentUser){
        next();
    }else{
        res.redirect('/user/login');
    }
};

const isTeacher = async (req, res, next) => {
    const user = await api.get('users', firebase.auth().currentUser.uid);
    if(user.isTeacher){
        next();
    }else{
        res.redirect('/student');
    }
};

const isStudent = async (req, res, next) => {
    const user = await api.get('users', firebase.auth().currentUser.uid);
    if(user.isTeacher){
        res.redirect('/teacher');
    }else{
        next();
    }
};

module.exports = {
    verifyAuth,
    isStudent,
    isTeacher
}