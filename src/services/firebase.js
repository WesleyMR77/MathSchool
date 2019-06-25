const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCz-Qg7kicQnXQeXDzJHSrBw_uNBiyN_IA",
    authDomain: "mathschool-49378.firebaseapp.com",
    databaseURL: "https://mathschool-49378.firebaseio.com",
    projectId: "mathschool-49378",
    storageBucket: "mathschool-49378.appspot.com",
    messagingSenderId: "351927352973",
    appId: "1:351927352973:web:cd195b1eba4fda05"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;