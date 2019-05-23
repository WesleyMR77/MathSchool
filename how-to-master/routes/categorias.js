const express = require('express')
const router = express.Router()


const controller = require('../controllers/categorias')

router.get('/nova', controller.novaForm)
router.post('/nova', controller.nova)
router.get('/', controller.list)
router.get('/excluir/:id', controller.deleteItem)
router.get('/editar/:id', controller.updateForm)
router.post('/editar/:id', controller.update)

module.exports = router