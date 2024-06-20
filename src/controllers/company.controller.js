const CompanyService = require('../services/company.service')

const service = new CompanyService()

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
        const data = response
        const resp = {
            resp: {
                status: true,
                code: 200,
                message: 'Success',
                data: data,
            },
        }
        res.json(resp)
    } catch (error) {
        const resp = {
            resp: {
                status: false,
                code: 500,
                message: error.message,
            },
        }

        res.status(500).json(resp)
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

const getByRuc = async (req, res) => {
    try {
        const { ruc } = req.query
        const response = await service.findByRuc(ruc)

        if (!response) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontró la empresa con el RUC proporcionado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Empresa encontrada con éxito',
            data: response,
        })
    } catch (error) {
        console.error('Error al buscar la empresa por RUC:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Error interno del servidor. Intente más tarde.',
        })
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
    getByRuc,
    update,
    _delete,
}
