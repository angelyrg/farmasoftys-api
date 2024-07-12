const { Op } = require('sequelize')
const { models } = require('../libs/sequelize')

class ProductService {
    constructor() {}

    async find() {
        const res = await models.Product.findAll()
        return res
    }

    async findOne(id) {
        const res = await models.Product.findByPk(id)
        return res
    }

    async findByField(search, category_id) {
        const whereClause = {}

        if (category_id) {
            whereClause.category_id = { [Op.like]: `${category_id}` }
        }

        if (search) {
            whereClause.marca_detalle = { [Op.like]: `%${search}%` }
        }

        const res = await models.Product.findAll({
            where: {
                [Op.and]: [whereClause],
            },
        })
        return res
    }

    async create(data) {
        const res = await models.Product.create(data)
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

module.exports = ProductService
