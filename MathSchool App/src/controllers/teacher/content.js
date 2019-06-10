const api = require('../../services/api');
const store = require('store');

//Prototipo: Content - Teacher
const contentsPage = async (req, res) => {
    const user = store.get('user');
    const contents = await api.list('contents');
    var myContents = []
    contents.forEach(element => {
        if(element.author == user.name){
            myContents.push(element);
        }
    });
    res.render('teacher/teacherContent', { contents, myContents, user });
};

//Listar conteudo
const getContent = async (req, res) => {
    const search = req.body.search;
    const AllContents = await api.list('contents');
    let contents = []; 
    AllContents.forEach(element => {
        if(element.name == search || element.author == search){
            contents.push(element);
        }
    });
    var myContents = []
    AllContents.forEach(element => {
        if(element.author == user.name){
            myContents.push(element);
        }
    });
    const user = store.get('user');
    res.render('teacher/teacherContent', { contents, myContents, user });
};

//Visualizar o conteudo
const viewContent = async (req, res) => {
    const content = await api.get('contents/' + req.params.id);
    const user = store.get('user');
    res.render('teacher/teacherContentID', { content, user });
};

//Prototipo: Content - Teacher - Content ID
const createContentPage = (req, res) => {
    const user = store.get('user');
    res.render('teacher/teacherCreateContent');
}

//Criar Conteudo
const createContent = async (req, res) => {
    const user = store.get('user');
    await api.createPost('contents', {
        title: req.body.title,
        subject: req.body.subject,
        text: req.body.text,
        author: user.name
    });
    res.redirect('/teacher/teacherContent');
};

module.exports = {
    contentsPage,
    getContent,
    viewContent,
    createContentPage,
    createContent
};