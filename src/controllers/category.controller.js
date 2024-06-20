const CategoryService = require('../services/category.service')

const service = new CategoryService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)
        res.json({ success: true, data: response })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find()

        if (!response || response.length === 0) {
            return res.status(404).json({
                resp: {
                    status: false,
                    code: 404,
                    message: 'No se encontraron datos',
                },
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Registros obtenidos',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener datos:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Error interno del servidor. Intente más tarde.',
        })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await service.findOne(id)
        res.json(response)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const response = await service.update(id, body)
        res.json(response)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params
        const response = await service.delete(id)
        res.json(response)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
    }
}

module.exports = {
    create,
    get,
    getById,
    update,
    _delete,
}
