const express = require('express')
const router = express.Router()

const companyController = require('../controllers/company.controller')

router
    .get('/', companyController.get)
    .get('/:id', companyController.getById)
    .post('/', companyController.create)
    .put('/:id', companyController.update)
    .delete('/:id', companyController._delete)

module.exports = router
