const api = require('../../services/api');
const store = require('store');

//Prototipo: Content - Student
const contentsPage = async (req, res) => {
    const user = store.get('user');
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents, user });
};

//Listar conteudo
const getContent = async (req, res) => {
    const search = req.body.search;
    const AllContents = await api.list('contents');
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
    const content = await api.get('contents/' + req.params.id);
    const user = store.get('user');
    res.render('student/studentContentID', { content, user });
};

module.exports = {
    contentsPage,
    getContent,
    viewContent
}