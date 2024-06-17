const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')

router
    .get('/', productController.get)
    .post('/', productController.create)
    .get('/:id', productController.getById)
    .get('/verify', (req, res) => {
        const { status } = req.query
        res.send(`Get SKUs by status. Params (status): ${status}`)
    })

    .put('/:id', productController.update)

module.exports = router
