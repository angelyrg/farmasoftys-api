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
                    model: models.Tienda,
                    as: 'tienda',
                    attributes: [
                        'name',
                        'address',
                        'ruc',
                        'tienda_img',
                        'phone',
                        'latitude',
                        'longitude',
                        'max_radius',
                    ],
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
            tienda_name: userData.tienda.name,
            tienda_address: userData.tienda.address,
            tienda_ruc: userData.tienda.ruc,
            tienda_img: userData.tienda.tienda_img,
            tienda_phone: userData.tienda.phone,
            tienda_latitude: userData.tienda.latitude,
            tienda_longitude: userData.tienda.longitude,
            tienda_max_radius: userData.tienda.max_radius,
        }
        return result
    }

    async create(data) {
        const res = await models.User.create(data)

        const inserted_auth_code = res.id_oauth
        const fullUserInfo = await this.findByOAuth(inserted_auth_code)

        return fullUserInfo
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
        const count = await models.User.count()
        return count
    }
}

module.exports = UserService
