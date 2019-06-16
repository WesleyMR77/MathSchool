const api = require('../../services/api');
const store = require('store');

//Informacoes gerais 
var info = {
    title: "Conteudos",
    user: null
};

//Prototipo: Content - Student
const contentsPage = async (req, res) => {
    
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents, info });
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
    res.render('student/studentContent', { contents, info });
};

//Prototipo: Content - Student - Content ID
const viewContent = async (req, res) => {
    const content = await api.get('contents' + req.params.id);
    res.render('student/studentContentID', { content, info });
};

module.exports = {
    contentsPage,
    getContent,
    viewContent
}