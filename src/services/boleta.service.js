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

    async findTotalComision(user_id) {
        const boletas = await models.Boleta.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: models.Product,
                    as: 'products',
                    through: {
                        attributes: ['cantidad'],
                    },
                    attributes: ['comision'],
                },
            ],
        });
    
        let totalComision = 0;
    
        for (const boleta of boletas) {
            for (const product of boleta.products) {
                const cantidad = product.BoletaProduct.cantidad;
                const comision = product.comision;
                totalComision += cantidad * comision;
            }
        }
    
        return parseFloat(totalComision.toFixed(2));
    }

    async findHistorial({ user_id, month, year, order }) {
        let where = {
            user_id: user_id,
        }

        if (month) {
            where = {
                ...where,
                [Op.and]: [
                    ...(where[Op.and] || []),
                    Sequelize.where(
                        Sequelize.fn(
                            'MONTH',
                            Sequelize.col('Boleta.createdAt'),
                        ),
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
                        Sequelize.fn('YEAR', Sequelize.col('Boleta.createdAt')),
                        year,
                    ),
                ],
            }
        }

        let orderOption = [['createdAt', order ? order.toUpperCase() : 'ASC']]

        const res = await models.Boleta.findAll({
            where,
            order: orderOption,
            include: [
                {
                    model: models.Product,
                    as: 'products',
                    through: {
                        attributes: ['cantidad'],
                    },
                },
            ],
        })

        if (!res) {
            return null
        }

        const formattedBoletas = res.map(boleta => ({
            id_boleta: boleta.id,
            fecha_registro: new Date(boleta.createdAt).toLocaleString('es-PE', {
                timeZone: 'UTC',
            }),
            img_boleta: boleta.img_boleta,
            productos: boleta.products.map(product => ({
                id_producto: product.id,
                sector_general: product.sector_general,
                sector_detallado: product.sector_detallado,
                marca_detalle: product.marca_detalle,
                imagen_sku: product.imagen_sku,
                comision: parseFloat(product.comision),
                cantidad: product.BoletaProduct.cantidad,
            })),
        }));
    
        return formattedBoletas;
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
        if (!model) {
            return null
        }
        const res = await model.destroy()
        return res
    }
}

module.exports = BoletaService
