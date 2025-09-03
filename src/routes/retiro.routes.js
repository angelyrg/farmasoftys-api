const express = require('express')
const router = express.Router()

const retiroController = require('../controllers/retiro.controller')

const {
    validateCreateRetiro,
    validateUpdateRetiro,
} = require('../middlewares/retiro.middleware')

router
    .get('/', retiroController.get)
    .get('/:id', retiroController.getById)
    .post('/', validateCreateRetiro, retiroController.create)
    .put('/:id', validateUpdateRetiro, retiroController.update)
    .delete('/:id', retiroController._delete)

module.exports = router
