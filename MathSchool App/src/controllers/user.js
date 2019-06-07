const api = require('../services/api');
const firebase = require('../services/firebase');

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
            alert("Senha fraca.");
        }else{
            alert(errorMessage);
        };
        console.log("Seguinte Erro: " + error);
    });
    const id = firebase.auth().currentUser.uid;

    //Criando usuario na database
    await api.createSet('users', user, id);
    
    //Redirecionamento para a proxima pagina
    if(user.isTeacher){
        res.redirect('/teacher');
    }else{
        res.redirect('/student');
    }
};

//Autenticacao
const signIn = async (req, res) => {
    //Coletando dados das inputs
    var user = {
        email: req.body.email,
        password: req.body.password
    }

    //Autenticando via Firebase
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/wrong-password'){
            alert("Senha incorreta.");
        }else{
            alert(errorMessage);
        };
        console.log("Seguinte Erro: " + error); 
    });    

    const id = firebase.auth().currentUser.uid;

    //Coletando dados do usuario autenticado
    user = await api.get('users', id);
    
    //Redirecionamento para a proxima pagina
    if(user.isTeacher){
        res.redirect('/teacher');
    }else{
        res.redirect('/student');
    }
};

const getUser = async () => {
    const user = await api.get('users', firebase.auth().currentUser.uid);
    return user;
}

module.exports = {
    loginPage,
    signPage,
    signUp,
    signIn,
    getUser
};