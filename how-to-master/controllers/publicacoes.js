const api = require('../api')

const novaForm = async (req, res) => {
    const categorias = await api.list('categorias')
    res.render('publicacoes/nova', { categorias })
}

const nova = async (req, res) => {
    await api.create('publicacoes/' + req.body.categoria, {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    res.redirect('/publicacoes/categoria/' + req.body.categoria)
}

const list = async (req, res) => {
    const categoria = req.params.categoria
    const publicacoes = await api.list('publicacoes/' + categoria)
    res.render('publicacoes/index', { publicacoes, categoria })
}

const deleteItem = async (req, res) => {
    await api.deleteItem('publicacoes/'+req.params.categoria, req.params.id)
    res.redirect('/publicacoes/categoria/'+req.params.categoria)
}

const updateForm = async (req, res) => {
    const publicacao = await api.get('publicacoes/'+req.params.categoria, req.params.id)
    res.render('publicacoes/editar', { publicacao, categoria: req.params.categoria })
}

const update = async (req, res) => {
    await api.update('publicacoes/'+req.params.categoria, req.params.id, {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    res.redirect('/publicacoes/categoria/'+req.params.categoria)
}

module.exports = {
    novaForm,
    nova,
    list,
    deleteItem,
    updateForm,
    update
}