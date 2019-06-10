const api = require('../../services/api');
const store = require('store');

//Prototipo: Content - Student
<<<<<<< HEAD
const contentsPage = async (req, res) => {
    const user = store.get('user');
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents, user });
=======
const contentsPage = (req, res) => {
    const profile = user.getAuthUser;
    // const contents = await api.list('contents');
    const contents = api.list('contents'); 
    res.render('student/studentContent', { contents, profile });
>>>>>>> 2a101fb75332fb8abc415b32691b315454c7b452
};

//Listar conteudo
const getContent = async (req, res) => {
    const search = req.body.search;
    // const AllContents = await   api.list('contents');
    const AllContents = api.list('contents');
    let contents = [];
    AllContents.forEach(element => {
        if (element.name == search || element.author == search) {
            contents.push(element);
        }
    });
    const user = store.get('user');
    res.render('student/studentContent', { contents, user });
};

//Prototipo: Content - Student - Content ID
const viewContent = async (req, res) => {
<<<<<<< HEAD
    const content = await api.get('contents/' + req.params.id);
    // const content = api.get('contents/' + req.params.id);
=======
<<<<<<< HEAD
    const content = await api.get('contents/' + req.params.id);
    const user = store.get('user');
    res.render('student/studentContentID', { content, user });
=======
    // const content = await api.get('contents/' + req.params.id);
    const content = api.get('contents/' + req.params.id);
>>>>>>> 9bda776d6c2f7716e8d54d0ed14081d22ae3e50b
    const profile = user.getAuthUser;
    res.render('student/studentContentID', { content, profile });
>>>>>>> 2a101fb75332fb8abc415b32691b315454c7b452
};

module.exports = {
    contentsPage,
    getContent,
    viewContent
}