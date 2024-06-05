const { models } = require("./../libs/sequelize")

class SkuService {
  constructor() {}

  async find() {
    const res = await models.Sku.findAll()
    return res
  }

  async findOne(id) {
    const res = await models.Sku.findByPk(id)
    return res
  }

  async findByField(search) {
    const res = await models.Sku.findAll({
      where: {
        marca_detalle: {
          [Op.like]: `%${search}%`,
        },
      }
    });
    return res
  }

  async create(data) {
    const res = await models.Sku.create(data)
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

module.exports = SkuService
