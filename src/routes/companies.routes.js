const express = require('express')
const router = express.Router()

const companyController = require('../controllers/company.controller')

router
    .get('/info', companyController.get)
    .get('/verify', companyController.getByRuc)
    .get('/:id', companyController.getById)
    .post('/', companyController.create)
    .put('/:id', companyController.update)
    .delete('/:id', companyController._delete)

module.exports = router
