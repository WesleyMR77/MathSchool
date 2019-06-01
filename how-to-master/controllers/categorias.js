const api = require('../api')

const novaForm = (req, res) => {
    res.render('categorias/nova')
}

const nova = async (req, res) => {
    await api.create('categorias', {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
}

const list = async (req, res) => {
    const categorias = await api.list('categorias')
    res.render('categorias/index', { categorias })
}

const deleteItem = async (req, res) => {
    await api.deleteItem('categorias', req.params.id)
    await api.deleteItem('publicacoes', req.params.id)
    res.redirect('/categorias')
}

const updateForm = async (req, res) => {
    const categoria = await api.get('categorias', req.params.id)
    res.render('categorias/editar', { categoria })
}

const update = async (req, res) => {
    await api.update('categorias', req.params.id, {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
}

module.exports = {
    novaForm,
    nova,
    list,
    deleteItem,
    updateForm,
    update
}