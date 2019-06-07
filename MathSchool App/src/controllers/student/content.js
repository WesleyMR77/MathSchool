const api = require('../../services/api');
const user = require('../user');

//Prototipo: Content - Student
const contentPage = (req, res) => {
    const profile = user.getAuthUser;
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents, profile });
};

//Listar conteudo
const getContent = async (req, res) => {
    const search = req.body.search;
    const Allcontents = await api.list('contents');
    let contents = []; 
    Allcontents.forEach(element => {
        if(element.name == search || element.author == search){
            contents.push(element);
        }
    });
    const profile = user.getAuthUser;
    res.render('student/studentContent', { contents, profile });
};

//Prototipo: Content - Student - Content ID
const viewContent = async (req, res) => {
    const content = await api.get('contents/' + req.params.id);
    const profile = user.getAuthUser;
    res.render('student/studentContentID', { content, profile });
};

module.exports = { //Verificar com Andre se, neste caso, sera exportacao
    contentPage,
    getContent,
    viewContent
}