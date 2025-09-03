const RetiroService = require('../services/retiro.service')
const logger = require('../utils/logger')

const { addStatusLabelToRetiro } = require('../utils/retiros.mapper')

const service = new RetiroService()

const create = async (req, res) => {
    try {
        const { user_id } = req.body

        const data = {
            user_id,
        }

        const response = await service.create(data)
        const mapped = addStatusLabelToRetiro(response)

        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Registro creado exitosamente',
            data: mapped,
        })
    } catch (error) {
        const status = error.statusCode || 500
        let errorMsg = error.message

        if (status !== 400) {
            logger.error(`Error al crear registro de retiro: ${error}`)
            errorMsg = 'Ha ocurrido un error en el servidor. Intente más tarde'
        }

        return res.status(status).json({
            success: false,
            code: status,
            message: errorMsg,
        })
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find()

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontraron retiros',
            })
        }

        const mapped = response.map(addStatusLabelToRetiro)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Registros obtenidos',
            data: mapped,
        })
    } catch (error) {
        logger.error(`Error al obtener datos: ${error.message}`)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await service.findOne(id)

        if (!response) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontró el registro',
            })
        }

        const mapped = addStatusLabelToRetiro(response)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Registro obtenido',
            data: mapped,
        })
    } catch (error) {
        logger.error(`Error al obtener retiro por id: ${error.message}`)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params

        const allowedFields = [
            'requested_amount',
            'payment_date',
            'paid_amount',
            'comment',
            'status',
        ]

        const data = {}
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                data[field] = req.body[field]
            }
        })

        const existingRetiro = await service.findOne(id)
        if (!existingRetiro) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontró el retiro para actualizar',
            })
        }

        const response = await service.update(id, data)
        const mapped = addStatusLabelToRetiro(response)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Retiro actualizado exitosamente',
            data: mapped,
        })
    } catch (error) {
        logger.error(`Error al actualizar retiro: ${error.message}`)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params
        const response = await service.delete(id)
        if (!response) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'Retiro no encontrado',
            })
        }

        const mapped = addStatusLabelToRetiro(response)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Retiro eliminado exitosamente',
            data: mapped,
        })
    } catch (error) {
        logger.error(`Error al eliminar retiro: ${error.message}`)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

module.exports = {
    create,
    get,
    getById,
    update,
    _delete,
}
