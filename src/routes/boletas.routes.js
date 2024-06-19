const express = require('express')
const router = express.Router()

const boletaController = require('./../controllers/boleta.controller')

router
    .get('/', boletaController.get)
    .get('/user', boletaController.getHistorial)
    .get('/comisiones', boletaController.getTotalCantidad)
    .get('/historial', boletaController.getHistorial)
    .get('/:id', boletaController.getById)
    .post('/', boletaController.create)
    .put('/:id', boletaController.update)
    .delete('/:id', boletaController._delete)

module.exports = router
