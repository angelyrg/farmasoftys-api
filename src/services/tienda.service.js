const { models, sequelize } = require('../libs/sequelize')

class TiendaService {
    constructor() {}

    async find() {
        const res = await models.Tienda.findAll()
        return res
    }

    async findOne(id) {
        const res = await models.Tienda.findByPk(id)
        return res
    }

    async findByRuc(ruc) {
        const res = await models.Tienda.findOne({
            where: { ruc },
            // attributes: [
            //     'name',
            //     'ruc',
            //     'address',
            //     'tienda_img',
            //     'latitude',
            //     'longitude',
            //     'phone',
            //     [
            //         sequelize.literal(
            //             "CASE WHEN status = '1' THEN 'Activo' ELSE 'Inactivo' END",
            //         ),
            //         'Estado',
            //     ],
            //     'createdAt',
            // ],
        })
        return res
    }

    async create(data) {
        const res = await models.Tienda.create(data)
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

    async count() {
        const count = await models.Tienda.count()
        return count
    }
}

module.exports = TiendaService
