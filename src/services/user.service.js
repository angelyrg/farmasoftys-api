const { models } = require('../libs/sequelize')

class UserService {
    constructor() {}

    async find() {
        const res = await models.User.findAll()
        return res
    }

    async findOne(id) {
        const res = await models.User.findByPk(id)
        return res
    }

    async findByOAuth(oauth) {
        const user = await models.User.findOne({
            where: { id_oauth: oauth },
            include: [
                {
                    model: models.Company,
                    as: 'company',
                    attributes: ['company_name', 'company_adress', 'ruc'],
                },
            ],
        })
        return user
    }

    async create(data) {
        const res = await models.User.create(data)
        return res
    }

    async update(id, data) {
        const model = await this.findOne(id)
        const res = await model.update(data)
        return res
    }

    async delete(id) {
        const model = await this.findOne(id)
        await model.destroy()
        return { deleted: true }
    }
}

module.exports = UserService
