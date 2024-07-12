const { models } = require('../libs/sequelize')

class NewsCategoryService {
    constructor() {}

    async find() {
        const res = await models.NewsCategory.findAll()
        return res
    }

    async findWithNews() {
        const res = await models.NewsCategory.findAll({
            include: [
                {
                    model: models.News,
                    as: 'news',
                },
            ],
        })

        if (res.length === 0) {
            return null
        }

        const formattedResponse = res.map((category) => ({
            title: category.title,
            content: category.news.map((novedad) => ({
                id: novedad.id,
                title: novedad.title,
                image: novedad.image,
                link: novedad.link,
                link_type: novedad.link_type,
            })),
        }))

        return formattedResponse
    }

    async findOne(id) {
        const res = await models.NewsCategory.findByPk(id)
        return res
    }

    async create(data) {
        const res = await models.NewsCategory.create(data)
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

module.exports = NewsCategoryService
