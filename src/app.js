const express = require('express')
require('dotenv').config()

const port = process.env.port || 3000

const app = express()

const routerApi = require('./routes/index')
routerApi(app)


app.listen(port, ()=>{
    console.log(`Server listening in http://localhost:${port}`)
})