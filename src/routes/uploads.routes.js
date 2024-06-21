const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
    uploadImageController,
} = require('../controllers/cloudinary.controller')

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('image'), uploadImageController)
// router.delete('/delete/:public_id', deleteImageController)

module.exports = router
