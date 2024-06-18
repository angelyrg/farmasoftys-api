const express = require('express')

const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const boletasRouter = require('./boletas.routes')
const companiesRouter = require('./companies.routes')
const popupsRouter = require('./popups.routes')
const usersRouter = require('./users.routes')

function routerApi(app) {
    const router = express.Router()
    app.use('/api', router)

    router.use('/category', categoryRouter)
    router.use('/sku', productRouter)
    router.use('/boletas', boletasRouter)
    router.use('/store', companiesRouter)
    router.use('/popup', popupsRouter)
    router.use('/user', usersRouter)
}

module.exports = routerApi
