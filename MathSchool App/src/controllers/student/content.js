const api = require('../../api');

//Prototipo: Contents - Student
const contentPage = (req, res) => {
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents });
};

//Listar conteudo
const getContent = async (req, res) => {
    
};

//Prototipo: Content - Student - Content ID
const viewContent = (req, res) => {
    
};

module.exports = { //Verificar com Andre se, neste caso, sera exportacao
    contentPage,
    listContents,
    viewContent
}