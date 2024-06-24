const { models, sequelize } = require('../libs/sequelize')

class CompanyService {
    constructor() {}

    async find() {
        const res = await models.Company.findAll()
        return res
    }

    async findOne(id) {
        const res = await models.Company.findByPk(id)
        return res
    }

    async findByRuc(ruc) {
        const res = await models.Company.findOne({
            where: { ruc },
            attributes: [
                'img_company',
                'company_name',
                'ruc',
                'company_adress',
                'company_phone',
                [
                    sequelize.literal(
                        "CASE WHEN status = '1' THEN 'Activo' ELSE 'Inactivo' END",
                    ),
                    'Estado',
                ],
                [
                    sequelize.literal("DATE_FORMAT(createdAt, '%d/%m/%Y')"),
                    'Fecha',
                ],
            ],
        })
        return res
    }

    async create(data) {
        const res = await models.Company.create(data)
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

module.exports = CompanyService
