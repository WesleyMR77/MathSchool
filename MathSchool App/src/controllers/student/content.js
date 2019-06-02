const api = require('../../api');

//Prototipo: Content - Student
const contentPage = (req, res) => {
    const contents = await api.list('contents');
    res.render('student/studentContent', { contents });
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
    res.render('student/studentContent', { contents });
};

//Prototipo: Content - Student - Content ID
const viewContent = async (req, res) => {
    const content = await api.get()
};

module.exports = { //Verificar com Andre se, neste caso, sera exportacao
    contentPage,
    getContent,
    viewContent
}