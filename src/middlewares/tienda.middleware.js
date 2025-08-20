const { query, validationResult, check } = require('express-validator')
const { Tienda } = require('../models/tienda.model')

const validateCreateTienda = [
    check('name').notEmpty().withMessage('El campo "name" es obligatorio'),
    check('ruc')
        .notEmpty()
        .withMessage('El campo "ruc" es obligatorio')
        .custom(async (value) => {
            const user = await Tienda.findOne({ where: { ruc: value } })
            if (user) {
                return Promise.reject('El ruc ya se encuentra registrado')
            }
        }),
    check('address')
        .notEmpty()
        .withMessage('El campo "address" es obligatorio'),
    check('latitude')
        .optional({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('La latitud debe estar entre -90 y 90 grados'),
    check('longitude')
        .optional({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('La longitud debe estar entre -180 y 180 grados'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'Error al validar los datos',
                errors: errors.array(),
            })
        }
        next()
    },
]

const validateRUCParams = [
    query('ruc').notEmpty().withMessage('El parámetro "ruc" es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'Error al validar los datos',
                errors: errors.array(),
            })
        }
        next()
    },
]

module.exports = { validateCreateTienda, validateRUCParams }
