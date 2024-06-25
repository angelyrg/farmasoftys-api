const NewsService = require('../services/news.service')

const service = new NewsService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)

        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Novedad creado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear novedades:', error)
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
                message: 'No se encontraron novedades',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener novedades.', error)
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
                message: 'No se encontró la novedad',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener novedad por id:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getByNewsType = async (req, res) => {
    try {
        const response = await service.findByNewsType()

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontraron registros',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Registros encontrados con éxito',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener noticias por tipo:', error)
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
            message: 'Novedad actualizado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al actualizar la novedad:', error)
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
                message: 'Novedad no encontrado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Novedad eliminado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al eliminar la novedad:', error)
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
    getByNewsType,
    update,
    _delete,
}
