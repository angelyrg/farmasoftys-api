const { Sequelize, Op } = require('sequelize')
const { models } = require('./../libs/sequelize')

class BoletaService {
    constructor() {}

    async find() {
        const res = await models.Boleta.findAll()
        return res
    }

    async findOne(id) {
        const res = await models.Boleta.findByPk(id)
        return res
    }

    async findTotalCantidad(userId) {
        const total = await models.Boleta.sum(
            'products.BoletaProduct.cantidad',
            {
                include: [
                    {
                        model: models.Product,
                        as: 'products',
                        through: { attributes: [] },
                    },
                ],
                where: { user_id: userId },
            },
        )
        return total || 0
    }

    async findHistorial({ userId, month, year, order }) {
        let where = {
            user_id: userId,
        }

        if (month) {
            where = {
                ...where,
                [Op.and]: [
                    ...(where[Op.and] || []),
                    Sequelize.where(
                        Sequelize.fn('MONTH', Sequelize.col('createdAt')),
                        month,
                    ),
                ],
            }
        }

        if (year) {
            where = {
                ...where,
                [Op.and]: [
                    ...(where[Op.and] || []),
                    Sequelize.where(
                        Sequelize.fn('YEAR', Sequelize.col('createdAt')),
                        year,
                    ),
                ],
            }
        }

        let orderOption = [['createdAt', order ? order.toUpperCase() : 'ASC']]

        const res = await models.Boleta.findAll({
            where,
            order: orderOption,
        })

        return res
    }

    async create(data) {
        const { products, ...boletaData } = data
        const boleta = await models.Boleta.create(boletaData)

        if (products && products.length > 0) {
            for (const product of products) {
                await models.BoletaProduct.create({
                    boleta_id: boleta.id,
                    product_id: product.id,
                    cantidad: product.cantidad,
                })
            }
        }

        return boleta
    }

    async update(id, data) {
        const { products, ...boletaData } = data
        const boleta = await this.findOne(id)
        await boleta.update(boletaData)

        if (products && products.length > 0) {
            await models.BoletaProduct.destroy({ where: { boleta_id: id } })

            for (const product of products) {
                await models.BoletaProduct.create({
                    boleta_id: boleta.id,
                    product_id: product.id,
                    cantidad: product.cantidad,
                })
            }
        }

        return boleta
    }

    async delete(id) {
        const model = await this.findOne(id)
        await model.destroy()
        return { deleted: true }
    }
}

module.exports = BoletaService
