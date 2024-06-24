const { query, validationResult, check } = require('express-validator')
const { Company } = require('../models/company.model')

const validateCreateCompany = [
    check('ruc')
        .notEmpty()
        .withMessage('ruc es obligatorio')
        .custom(async (value) => {
            const user = await Company.findOne({ where: { ruc: value } })
            if (user) {
                return Promise.reject('El ruc ya se encuentra registrado')
            }
        }),
    check('company_adress')
        .notEmpty()
        .withMessage('company_adress es obligatorio'),
    check('company_name').notEmpty().withMessage('company_name es obligatorio'),
    check('company_phone')
        .notEmpty()
        .withMessage('company_phone es obligatorio'),

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

module.exports = { validateCreateCompany, validateRUCParams }
