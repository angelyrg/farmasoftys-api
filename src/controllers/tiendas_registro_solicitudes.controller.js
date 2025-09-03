const TiendasRegistrosSolicitudesService = require('../services/tiendas_registro_solicitudes.service')

const service = new TiendasRegistrosSolicitudesService()

const { sendWelcomeEmail } = require('../libs/mailjet');

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)

        // Enviar correo
        const { manager_name, email } = req.body;
        const correoResult = await sendWelcomeEmail({
            to: email,
            name: manager_name,
            solicitud: response,
        });

        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Registro de solicitud de tienda creado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear el registro:', error)
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
                message: 'No se encontraron registros',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener registros.', error)
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

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener el registro por id:', error)
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
            message: 'Registro actualizado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al actualizar el registro:', error)
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
                message: 'Registro no encontrado',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Registro eliminado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al eliminar el registro:', error)
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
