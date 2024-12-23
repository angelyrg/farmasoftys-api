const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboard.controller')

router.get('/', dashboardController.getGeneral)

module.exports = router
