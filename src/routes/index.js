const express = require('express')

const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const boletasRouter = require('./boletas.routes')
const tiendasRouter = require('./tiendas.routes')
const usersRouter = require('./users.routes')
const newsRouter = require('./news.routes')
const uploadsRouter = require('./uploads.routes')

function routerApi(app) {
    const router = express.Router()
    app.use('/api', router)

    router.use('/store', tiendasRouter)
    router.use('/user', usersRouter)
    router.use('/category', categoryRouter)
    router.use('/sku', productRouter)
    router.use('/boleta', boletasRouter)
    router.use('/novedades', newsRouter)

    router.use('/cloudinary', uploadsRouter)
}

module.exports = routerApi
