const CompanyService = require('../services/company.service')

const service = new CompanyService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)
        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Tienda creada exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear la tienda:', error)
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
                message: 'No se encontraron tiendas',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener tiendas.', error)
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
                message: 'No se encontró la tienda',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener tienda por id:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
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
                message: 'No se encontró la tienda con el RUC proporcionado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener la tienda por RUC:', error)
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
            message: 'Tienda actualizada exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al actualizar la tienda:', error)
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
                message: 'Tienda no encontrada',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Tienda eliminada exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al eliminar la tienda:', error)
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
    getByRuc,
    update,
    _delete,
}
