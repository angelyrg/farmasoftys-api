const fs = require('fs')
const cloudinary = require('../libs/cloudinary')

class CloudinaryService {
    constructor() {}

    async upload(filePath, folder) {
        const stats = fs.statSync(filePath)
        const fileSizeInBytes = stats.size
        const SIZE_LIMIT = 20 * 1024 * 1024 // 20 MB

        let result

        if (fileSizeInBytes > SIZE_LIMIT) {
            // Archivo grande, usar upload_large
            result = await cloudinary.uploader.upload_large(filePath, {
                folder: folder,
                chunk_size: 6000000, // chunk de 6MB
            })
        } else {
            // Archivo pequeño, usar upload normal
            result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
            })
        }

        return result
    }

    async delete(public_id) {
        const result = await cloudinary.uploader.destroy(public_id)
        return result
    }
}

module.exports = CloudinaryService
