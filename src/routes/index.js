const express = require('express')

const categoryRouter = require('./category.routes')
const productRouter = require('./product.routes')
const boletasRouter = require('./boletas.routes')
const tiendasRouter = require('./tiendas.routes')
const usersRouter = require('./users.routes')
const newsRouter = require('./news.routes')
const newsCategoryRouter = require('./news_category.routes')
const popupRouter = require('./popup.routes')
const uploadsRouter = require('./uploads.routes')
const tiendasRegistroSolicitudesRouter = require('./tiendas_registro_solicitudes.routes')
const dashboardRouter = require('./dashboard.routes')
const openIARouter = require('./openia.routes')

function routerApi(app) {
    const router = express.Router()
    app.use('/v1', router)

    router.use('/store', tiendasRouter)
    router.use('/user', usersRouter)
    router.use('/category', categoryRouter)
    router.use('/sku', productRouter)
    router.use('/boleta', boletasRouter)
    router.use('/news', newsRouter)
    router.use('/novedades', newsCategoryRouter)
    router.use('/popup', popupRouter)
    router.use('/cloudinary', uploadsRouter)
    router.use('/store-registration-requests', tiendasRegistroSolicitudesRouter)
    router.use('/dashboard', dashboardRouter)
    router.use('/openia', openIARouter)

}

module.exports = routerApi
