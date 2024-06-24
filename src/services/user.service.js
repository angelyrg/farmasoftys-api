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

        if (!user) {
            return null
        }

        const userData = user.toJSON()

        const result = {
            id: userData.id,
            id_oauth: userData.id_oauth,
            fullname: userData.fullname,
            phone: userData.phone,
            email: userData.email,
            clave: userData.clave,
            img_profile: userData.img_profile,
            id_rol: userData.id_rol,
            status: userData.status,
            company_name: userData.company.company_name,
            company_adress: userData.company.company_adress,
            ruc: userData.company.ruc,
        }
        return result
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
        if (!model) {
            return null
        }
        const res = await model.destroy()
        return res
    }
}

module.exports = UserService
