const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')

router
    .get('/', productController.get)
    .post('/', productController.create)
    .get('/search', productController.getBySearching)
    .get('/:id', productController.getById)
    .put('/:id', productController.update)

module.exports = router
