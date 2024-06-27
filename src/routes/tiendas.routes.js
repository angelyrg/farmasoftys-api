const express = require('express')
const router = express.Router()

const tiendaController = require('../controllers/tienda.controller')
const {
    validateCreateTienda,
    validateRUCParams,
} = require('../middlewares/tienda.middleware')

router
    .get('/', tiendaController.get)
    .get('/verify', validateRUCParams, tiendaController.getByRuc)
    .get('/:id', tiendaController.getById)
    .post('/', validateCreateTienda, tiendaController.create)
    .put('/:id', tiendaController.update)
    .delete('/:id', tiendaController._delete)

module.exports = router
