const UserService = require('../services/user.service')
const RetiroService = require('../services/retiro.service')

const { addStatusLabelToRetiro } = require('../utils/retiros.mapper')

const service = new UserService()
const retiroService = new RetiroService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)
        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Usuario creado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear el usuario:', error)
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
                message: 'No hay usuarios registrados',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener usuarios.', error)
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
                message: 'No se encontró el usuario',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener usuario por id:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getByOAuth = async (req, res) => {
    try {
        const { oauth, code } = req.query
        const oauth_code = oauth ? `${oauth}|${code}` : code

        const response = await service.findByOAuth(oauth_code)

        if (!response) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontró el usuario',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Usuario encontrado con éxito',
            data: response,
        })
    } catch (error) {
        console.error('Error al buscar usuario por OAuth:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getRetirosByUserId = async (req, res) => {
    try {
        const { id } = req.params

        const response = await retiroService.findByUserId(id)

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'No se encontraron retiros para el usuario',
            })
        }

        const mapped = response.map(addStatusLabelToRetiro)

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Retiros obtenidos correctamente',
            data: mapped,
        })
    } catch (error) {
        console.error('Error al obtener retiros del usuario:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde',
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
            message: 'Usuario actualizado exitosamente',
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
                message: 'Usuario no encontrado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Usuario eliminado exitosamente',
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
    getByOAuth,
    getRetirosByUserId,
    update,
    _delete,
}
