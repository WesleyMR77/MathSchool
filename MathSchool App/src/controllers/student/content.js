const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Conteudos"
};

//Prototipo: Content - Student
const contentsPage = async (req, res) => {
    const user = store.get('user');
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents, user, info });
};

//Listar conteudo
const getContent = async (req, res) => {
    const search = req.body.search;
    const AllContents = await api.list('contents');
    var contents = [];
    AllContents.forEach(element => {
        if (element.name == search || element.author == search) {
            contents.push(element);
        }
    });
    const user = store.get('user');
    res.render('student/studentContent', { contents, user, info });
};

//Prototipo: Content - Student - Content ID
const viewContent = async (req, res) => {
    const content = await api.get('contents' + req.params.id);
    const user = store.get('user');
    res.render('student/studentContentID', { content, user, info });
};

module.exports = {
    contentsPage,
    getContent,
    viewContent
}