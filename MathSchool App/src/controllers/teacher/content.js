const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Conteúdos",
    user: null
};

//Prototipo: Content - Teacher
const contentsPage = async (req, res) => {
    info.user = store.get('user');
    const contents = await api.list('contents');
    var myContents = []
    contents.forEach(element => {
        if(element.author == info.user.name){
            myContents.push(element);
        }
    });
    res.render('teacher/teacherContent', { contents, myContents, info });
};

//Listar conteudo
const getContent = async (req, res) => {
    info.user = store.get('user');
    const search = req.body.search;
    const AllContents = await api.list('contents');
    var contents = []; 
    var myContents = [];
    if(search != ""){
        AllContents.forEach(element => {
            if(element.name == search || element.author == search){
                contents.push(element);
            }
            if(element.author == info.user.name && (element.name == search || element.author == search)){
                myContents.push(element);
            }
        });
    }else{
        AllContents.forEach(element => {
            contents.push(element);

            if(element.author == info.user.name){
                myContents.push(element);
            }
        });
    };
    res.render('teacher/teacherContent', { contents, myContents, info });
};

//Visualizar o conteudo
const viewContent = async (req, res) => {
    const content = await api.get('contents', req.params.id);
    info.user = store.get('user');
    res.render('teacher/teacherContentID', { content, info });
};

//Prototipo: Content - Teacher - Content ID
const createContentPage = (req, res) => {
    info.user = store.get('user');
    res.render('teacher/teacherCreateContent', { info });
};

//Criar Conteudo
const createContent = async (req, res) => {
    info.user = store.get('user');
    await api.createPost('contents', {
        name: req.body.name,
        subject: req.body.subject,
        text: req.body.text,
        author: info.user.name
    });
    res.redirect('/teacher/content');
};

//Deletar conteudo
const deleteContent = async (req, res) => {
    await api.deleteItem('contents', req.params.id);
    res.redirect('/teacher/content');
};

module.exports = {
    contentsPage,
    getContent,
    viewContent,
    createContentPage,
    createContent,
    deleteContent
};