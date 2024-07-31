const { models } = require('../libs/sequelize')

class TiendasRegistrosSolicitudesService {
    constructor() {}

    async find() {
        const res = await models.TiendasRegistrosSolicitudes.findAll()
        return res
    }

    async findOne(id) {
        const res = await models.TiendasRegistrosSolicitudes.findByPk(id)
        return res
    }

    async create(data) {
        const res = await models.TiendasRegistrosSolicitudes.create(data)
        return res
    }

    async update(id, data) {
        const model = await this.findOne(id)
        const res = await model.update(data)
        return res
    }

    async delete(id) {
        const model = await this.findOne(id)
        if (!model) {
            return null
        }
        const res = await model.destroy()
        return res
    }
}

module.exports = TiendasRegistrosSolicitudesService
