const TiendasRegistrosSolicitudesService = require('../services/tiendas_registro_solicitudes.service')
const logger = require('../utils/logger')
const {
    TIENDA_REGISTRO_STATUS,
} = require('../constants/tienda_registros.constant')

const service = new TiendasRegistrosSolicitudesService()

const { sendWelcomeEmail } = require('../libs/mailjet')

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)

        // Enviar correo
        const plainDataSolicitud = response.toJSON()
        const { manager_name, email } = req.body
        const correoResult = await sendWelcomeEmail({
            to: email,
            name: manager_name,
            solicitud: plainDataSolicitud,
        })

        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Registro de solicitud de tienda creado exitosamente',
            data: response,
        })
    } catch (error) {
        logger.error(
            `Error al crear el registro de solicitud de tienda: ${error}`,
        )
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

const getByUUID = async (req, res) => {
    const { uuid } = req.params

    try {
        const solicitud = await service.findbyUUID(uuid)

        if (!solicitud) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'La solicitud no fue encontrada o el enlace es inválido.',
            })
        }

        if (solicitud.status !== TIENDA_REGISTRO_STATUS.CREADA) {
            return res.status(410).json({
                success: false,
                code: 410,
                message: 'Esta solicitud ya ha sido procesada anteriormente.',
            })
        }

        const publicData = {
            name: solicitud.name,
            manager_name: solicitud.manager_name,
            address: solicitud.address,
            phone: solicitud.phone,
            email: solicitud.email,
            ruc: solicitud.ruc,
            uuid: solicitud.uuid,
            fecha: new Date(solicitud.createdAt).toLocaleString('es-PE', {
                timeZone: 'America/Lima',
            }),
        }

        return res.status(200).json({
            success: true,
            data: publicData,
        })
    } catch (error) {
        logger.error(`Error al obtener la solicitud por UUID: ${error}`)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const updateStatusByUUID = async (req, res) => {
    const { uuid, action } = req.params

    try {
        const solicitud = await service.findbyUUID(uuid)

        if (!solicitud) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'La solicitud no fue encontrada o el enlace es inválido.',
            })
        }

        if (solicitud.status !== TIENDA_REGISTRO_STATUS.CREADA) {
            return res.status(410).json({
                success: false,
                code: 410,
                message: 'Esta solicitud ya ha sido procesada anteriormente.',
            })
        }

        let newStatus, successMessage;
        if (action === 'accept') {
            newStatus = TIENDA_REGISTRO_STATUS.APROBADA_POR_MANAGER;
            successMessage = 'La solicitud ha sido confirmada exitosamente. Gracias por validar la información.';
        } else if (action === 'reject') {
            newStatus = TIENDA_REGISTRO_STATUS.RECHAZADA_POR_MANAGER;
            successMessage = 'Has decidido no continuar con el registro de esta tienda. La solicitud ha sido cancelada.';
        } else {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'Acción no válida.',
            });
        }

        const updated = await solicitud.update({
            status: newStatus,
        })

        const publicData = {
            name: updated.name,
            manager_name: updated.manager_name,
            address: updated.address,
            phone: updated.phone,
            email: updated.email,
            ruc: updated.ruc,
            uuid: updated.uuid,
        }

        return res.status(200).json({
            success: true,
            message: successMessage,
            data: publicData,
        })
    } catch (error) {
        logger.error(`Error al procesar la solicitud '${action}' sobre solicitud UUID: ${uuid} - ${error}`);
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ocurrió un error inesperado al procesar la solicitud. Por favor, intenta nuevamente más tarde.',
        })
    }
}

module.exports = {
    create,
    get,
    getById,
    update,
    _delete,
    getByUUID,
    updateStatusByUUID
}
