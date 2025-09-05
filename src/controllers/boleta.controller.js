const logger = require('../utils/logger')
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
        logger.error(`Error al crear boleta: ${error}`)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find()

        if (!response) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontraron boletas',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener boletas.', error)
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
                message: 'No se encontró la boleta',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener la boleta', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getTotalComision = async (req, res) => {
    try {
        const { user_id } = req.query
        const comision = await service.findTotalComision(user_id)

        if (comision === null || comision === undefined) {
            return res.status(404).json({
                success: false,
                code: 404,
                message:
                    'No se pudo obtener la comisión para el usuario proporcionado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: { comision },
        })
    } catch (error) {
        console.error('Error al obtener la comisión:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getHistorial = async (req, res) => {
    try {
        const { user_id, month, year, order } = req.query
        const response = await service.findHistorial({
            user_id,
            month,
            year,
            order,
        })

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message:
                    'No se encontró historial con los parámetros proporcionados',
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
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const response = await service.update(id, body)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Boleta actualizado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al actualizar el usuario:', error)
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
                message: 'Boleta no encontrado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Boleta eliminado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al eliminar el usuario:', error)
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
    getTotalComision,
    getHistorial,
    update,
    _delete,
}
