const express = require('express')

const skusRouter = require('./skus.routes')
const boletasRouter = require('./boletas.routes')
const companiesRouter = require('./companies.routes')
const popupsRouter = require('./popups.routes')
const usersRouter = require('./users.routes')

function routerApi(app) {
    const router = express.Router()
    app.use('/api', router)

    router.use('/sku', skusRouter)
    router.use('/boletas', boletasRouter)
    router.use('/store', companiesRouter)
    router.use('/popup', popupsRouter)
    router.use('/users', usersRouter)
}

module.exports = routerApi
