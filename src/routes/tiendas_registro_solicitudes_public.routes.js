const express = require('express')
const router = express.Router()

const controller = require('../controllers/tiendas_registro_solicitudes.controller')

router.get('/:uuid', controller.getByUUID)
router.put('/:uuid/:action(accept|reject)', controller.updateStatusByUUID)

module.exports = router
