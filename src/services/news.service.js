const { models } = require('../libs/sequelize')
const groupBy = require('../utils/groupBy')

class NewsService {
    constructor() {}

    async find() {
        const res = await models.News.findAll()
        return res
    }

    async findByNewsType() {
        const news = await this.find()
        const groupedNews = groupBy(news, 'news_type')
        return groupedNews
    }

    async findOne(id) {
        const res = await models.News.findByPk(id)
        return res
    }

    async create(data) {
        const res = await models.News.create(data)
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

module.exports = NewsService
