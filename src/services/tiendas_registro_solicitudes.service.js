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

    async findbyUUID(uuid){
        const res = await models.TiendasRegistrosSolicitudes.findOne({
            where: { uuid },
        })
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

    async updateByUUID(uuid, data) {
        const model = await this.findbyUUID(uuid)
        if (!model) return null
        return await model.update(data)
    }
}

module.exports = TiendasRegistrosSolicitudesService
