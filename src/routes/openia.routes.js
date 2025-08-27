const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { procesarBoleta } = require('../controllers/openai.controller')

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname
        cb(null, uniqueName)
    },
})

const upload = multer({ storage })

router.post('/procesar', upload.single('image'), procesarBoleta)

module.exports = router
