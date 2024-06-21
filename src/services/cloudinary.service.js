const cloudinary = require('../libs/cloudinary')

class CloudinaryService {
    constructor() {}

    async upload(filePath, folder) {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
        })
        return result
    }

    async delete(public_id) {
        const result = await cloudinary.uploader.destroy(public_id)
        return result
    }
}

module.exports = CloudinaryService
