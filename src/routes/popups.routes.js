const express = require('express')
const router = express.Router()

const popupController = require('../controllers/popup.controller')

router
    .get('/', popupController.get)
    .get('/:id', popupController.getById)
    .post('/', popupController.create)
    .put('/:id', popupController.update)
    .delete('/:id', popupController._delete)

module.exports = router
