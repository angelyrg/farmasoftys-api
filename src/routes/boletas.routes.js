const express = require('express')
const router = express.Router()

const boletaController = require('./../controllers/boleta.controller')
const {
    validateCreateBoleta,
    validateUserIDParam,
} = require('../middlewares/boleta.middleware')

router
    .get('/', boletaController.get)
    .get('/user', validateUserIDParam, boletaController.getHistorial)
    .get('/historial', validateUserIDParam, boletaController.getHistorial)
    .get('/comisiones', validateUserIDParam, boletaController.getTotalComision)
    .get('/:id', boletaController.getById)
    .post('/', validateCreateBoleta, boletaController.create)
    .put('/:id', boletaController.update)
    .delete('/:id', boletaController._delete)

module.exports = router
