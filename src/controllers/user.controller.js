const UserService = require('../services/user.service')
const { validateCreate } = require('../middlewares/user.middleware')

const service = new UserService()

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
    getByOAuth,
    update,
    _delete,
}
