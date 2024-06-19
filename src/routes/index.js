const express = require('express')

const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const boletasRouter = require('./boletas.routes')
const companiesRouter = require('./companies.routes')
const usersRouter = require('./users.routes')
const newsRouter = require('./news.routes')

function routerApi(app) {
    const router = express.Router()
    app.use('/api', router)

    router.use('/store', companiesRouter)
    router.use('/user', usersRouter)
    router.use('/category', categoryRouter)
    router.use('/sku', productRouter)
    router.use('/boleta', boletasRouter)
    router.use('/novedades', newsRouter)
}

module.exports = routerApi
