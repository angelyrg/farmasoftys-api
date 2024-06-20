const express = require('express')
const router = express.Router()

const companyController = require('../controllers/company.controller')
const { validateRUCParams } = require('../middlewares/company.middleware')

router
    .get('/info', companyController.get)
    .get('/verify', validateRUCParams, companyController.getByRuc)
    .get('/:id', companyController.getById)
    .post('/', companyController.create)
    .put('/:id', companyController.update)
    .delete('/:id', companyController._delete)

module.exports = router
