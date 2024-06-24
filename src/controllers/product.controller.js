const ProductService = require('../services/product.service')
const service = new ProductService()

const create = async (req, res) => {
    try {
        const response = await service.create(req.body)
        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Producto creado exitosamente',
            data: response,
        })
    } catch (error) {
        console.error('Error al crear el producto:', error)
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
                message: 'No se encontraron productos',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener productos.', error)
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
                message: 'No se encontró el producto',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: response,
        })
    } catch (error) {
        console.error('Error al obtener producto por id:', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

const getByField = async (req, res) => {
    try {
        const { marca_detalle, category } = req.query
        const response = await service.findByField(marca_detalle, category)

        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message:
                    'No se encontraron datos con los parámetros proporcionados',
            })
        }

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Datos encontrados con éxito',
            data: response,
        })
    } catch (error) {
        console.error('Error al buscar datos por campo:', error)
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
    getByField,
    update,
    _delete,
}
