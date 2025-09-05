const fs = require('fs')
const logger = require('../utils/logger')
const CloudinaryService = require('../services/cloudinary.service')
const service = new CloudinaryService()

const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'No se ha subido ningún archivo',
            })
        }

        const folder = 'softys'
        const result = await service.upload(req.file.path, folder)

        // Después de subir la imagen a Cloudinary, eliminar el archivo temporal
        fs.unlinkSync(req.file.path)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Imagen subida exitosamente',
            data: {
                secure_url: result.secure_url,
                public_id: result.public_id,
                created_at: result.created_at,
            },
        })
    } catch (error) {
        fs.unlinkSync(req.file.path)
        logger.error(`Error al subir la imagen a cloudinary: ${JSON.stringify({
            message: error.message,
            name: error.name,
            stack: error.stack,
            cloudinaryError: error.error?.message || null,
        })}`);
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

module.exports = {
    uploadImageController,
}
