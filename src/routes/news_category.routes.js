const express = require('express')
const router = express.Router()

const newsCategoryController = require('../controllers/news_category.controller')

router
    .get('/', newsCategoryController.get)
    .get('/grouped', newsCategoryController.getWithNews)
    .get('/:id', newsCategoryController.getById)
    .post('/', newsCategoryController.create)
    .put('/:id', newsCategoryController.update)
    .delete('/:id', newsCategoryController._delete)

module.exports = router
