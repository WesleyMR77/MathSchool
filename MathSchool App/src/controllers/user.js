const api = require('../services/api');
const firebase = require('../services/firebase');
const store = require('store');

//Prototipo: Login
const loginPage = (req, res) => {
    res.render('user/login');
};

//Prototipo: Sign In
const signPage = (req, res) => {
    res.render('user/signIn');
};

//Cadastrar Usuario
const signUp = async (req, res) => {
    
    //Coletando dados das inputs
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isTeacher: req.body.isTeacher
    }

    //Criando via Firebase
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/weak-password'){
            console.log("Senha fraca.");
        }else{
            console.log(errorMessage);
        };
        console.log("Seguinte Erro: " + error);
    });
    const id = firebase.auth().currentUser.uid;

    //Criando usuario na database
    await api.createSet('users', user, id);
    store.set('user', user);
    
    //Redirecionamento para a proxima pagina
    if(user.isTeacher){
        res.redirect('/teacher');
    }else{
        res.redirect('/student');
    }
};

//Autenticacao
const signIn = async (req, res) => {
    //Autenticando via Firebase
    await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/wrong-password'){
            console.log("Senha incorreta.");
        }else{
            console.log(errorMessage);
        };
        console.log("Seguinte Erro: " + error); 
    });    

    const id = firebase.auth().currentUser.uid;

    //Coletando dados do usuario autenticado
    const user = await api.get('users', id);
    store.set('user', user);
    
    //Redirecionamento para a proxima pagina
    if(user.isTeacher){
        res.redirect('/teacher');
    }else{
        res.redirect('/student');
    }
};

//Desautenticacao
const logOut = async (req, res) => {
    await firebase.auth().logOut();
    store.remove('user');
    res.redirect('/user/login');
};

module.exports = {
    loginPage,
    signPage,
    signUp,
    signIn,
    logOut
};