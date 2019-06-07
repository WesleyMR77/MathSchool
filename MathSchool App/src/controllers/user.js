const api = require('../services/api');
const firebase = require('../services/firebase');

//Prototipo: 
const loginPage = (req, res) => {
    res.render('user/login');
};

//Prototipo: 
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
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/weak-password'){
            alert("Senha fraca.");
        }else{
            alert(errorMessage);
        };
        console.log("Seguinte Erro: " + error);
    });

    firebase.auth().onAuthStateChanged( firebaseUser => {
        if(firebaseUser){
            const id = firebaseUser.uid;
        }else{
            console.log("Erro de Cadastro e Autenticacao")
        }
        
    })

    //Criando usuario na database
    await api.createSet('users', user, id);
    console.log(user);
};

//Autenticacao
const signIn = async (req, res) => {
    //Coletando dados das inputs
    var user = {
        email: req.body.email,
        password: req.body.password
    }

    //Autenticando via Firebase
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == 'auth/wrong-password'){
            alert("Senha incorreta.");
        }else{
            alert(errorMessage);
        };
        console.log("Seguinte Erro: " + error); 
    });    

    firebase.auth().onAuthStateChanged( firebaseUser => {
        if(firebaseUser){
            const id = firebaseUser.uid;
        }else{
            console.log("Erro de Autenticacao")
        }
    });

    //Coletando dados do usuario autenticado
    user = await api.get('users', id);
    console.log(user); 
};

module.exports = {
    loginPage,
    signPage,
    signUp,
    signIn
};