const CategoryService = require('../services/category.service')

const service = new CategoryService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)
        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Categoría creado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear la categoría:', error)
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

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontraron categorías',
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
                message: 'No se encontró categoría',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener categoría por id:', error)
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
            message: 'Categoría actualizado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al actualizar boleta:', error)
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
                message: 'Categoría no encontrado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Categoría eliminado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al eliminar categoría:', error)
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
