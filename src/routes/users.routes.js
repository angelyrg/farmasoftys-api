const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const {
    validateCreateUser,
    validateOAuthParams,
} = require('../middlewares/user.middleware')

router
    .get('/', userController.get)
    .get('/oauth0', validateOAuthParams, userController.getByOAuth)
    .get('/:id/retiros', userController.getRetirosByUserId)
    .get('/:id', userController.getById)
    .post('/register', validateCreateUser, userController.create)
    .put('/:id', userController.update)
    .delete('/:id', userController._delete)

module.exports = router
