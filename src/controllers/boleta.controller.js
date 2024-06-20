const BoletaService = require('../services/boleta.service')

const service = new BoletaService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)

        if (!response) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: 'Error al crear la boleta',
            })
        }

        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Boleta creada exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear la boleta:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Error interno del servidor. Intente más tarde.',
        })
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

const getTotalCantidad = async (req, res) => {
    try {
        const { id_usuario } = req.query
        const total = await service.findTotalCantidad(id_usuario)

        if (total === null || total === undefined) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontró total para el usuario proporcionado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Total obtenido con éxito',
            data: { total },
        })
    } catch (error) {
        console.error('Error al obtener el total de cantidad:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Error interno del servidor. Intente más tarde.',
        })
    }
}

const getHistorial = async (req, res) => {
    try {
        const { id_usuario, month, year, order } = req.query
        const response = await service.findHistorial({
            userId: id_usuario,
            month,
            year,
            order,
        })

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message:
                    'No se encontró historial para el usuario proporcionado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Historial encontrado con éxito',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener el historial:', error)
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
    getTotalCantidad,
    getHistorial,
    update,
    _delete,
}
