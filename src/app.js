const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port = process.env.port || 3000

const app = express()

app.use(cors())
// Middleware para parsear JSON
app.use(express.json())

const routerApi = require('./routes/index')
routerApi(app)

app.listen(port, () => {
    console.log(`Server listening in http://localhost:${port}`)
})
