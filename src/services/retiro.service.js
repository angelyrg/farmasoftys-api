const { models } = require('../libs/sequelize')
const groupBy = require('../utils/groupBy')

class RetiroService {
    constructor() {}

    async find() {
        const res = await models.Retiro.findAll({
            include: [
                {
                    model: models.Boleta,
                    as: 'boletas',
                },
            ],
        })
        return res
    }

    async findOne(id) {
        const res = await models.Retiro.findByPk(id)
        return res
    }

    async findByUserId(userId) {
        const res = await models.Retiro.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: models.Boleta,
                    as: 'boletas',
                },
                {
                    model: models.User,
                    as: 'user',
                    attributes: ['id', 'fullname', 'email', 'phone'],
                },
            ],
            order: [['request_date', 'DESC']],
        })

        return res
    }

    async create(data) {
        // Verificar si el usuario tiene boletas sin retiro asociado
        const boletasSinRetiro = await models.Boleta.findAll({
            where: {
                user_id: data.user_id,
                retiro_id: null,
            },
        })

        if (boletasSinRetiro.length === 0) {
            const error = new Error(
                'No hay boletas disponibles para solicitar el retiro.',
            )
            error.statusCode = 400
            throw error
        }

        const totalComision = boletasSinRetiro.reduce((sum, boleta) => {
            return sum + parseFloat(boleta.comision_total)
        }, 0)

        // Crear el retiro
        const retiro = await models.Retiro.create({
            ...data,
            requested_amount: totalComision,
        })

        // Asociar boletas con retiro_id NULL del usuario
        await models.Boleta.update(
            { retiro_id: retiro.id },
            {
                where: {
                    user_id: data.user_id,
                    retiro_id: null,
                },
            },
        )

        return retiro
    }

    async update(id, data) {
        const model = await this.findOne(id)
        if (!model) {
            return null
        }
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

module.exports = RetiroService
