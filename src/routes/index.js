const express = require('express')

const skuRouter = require('./skus.routes')

function routerApi(app){
    const router = express.Router()
    app.use('/api', router)
    
    router.use("/sku", skuRouter)
}

module.exports = routerApi