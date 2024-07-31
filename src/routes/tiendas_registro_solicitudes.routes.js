const express = require('express')
const router = express.Router()

const tiendasRegistroSoplicitudesController = require('../controllers/tiendas_registro_solicitudes.controller')
const {
    validateCreateTiendaRegistroSolicitud,
} = require('../middlewares/tiendas_registro_solicitudes.middleware')

router
    .get('/', tiendasRegistroSoplicitudesController.get)
    .get('/:id', tiendasRegistroSoplicitudesController.getById)
    .post('/', validateCreateTiendaRegistroSolicitud, tiendasRegistroSoplicitudesController.create)
    .put('/:id', tiendasRegistroSoplicitudesController.update)
    .delete('/:id', tiendasRegistroSoplicitudesController._delete)

module.exports = router
