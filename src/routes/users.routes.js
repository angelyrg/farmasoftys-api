const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router
    .get('/', userController.get)
    .get('/oauth0', userController.getByOAuth)
    .get('/:id', userController.getById)
    .post('/register', userController.create)
    .put('/:id', userController.update)
    .delete('/:id', userController._delete)

module.exports = router
