const { check, query, validationResult } = require('express-validator')
const { User } = require('../models/user.model')

const validateCreateUser = [
    check('id_oauth')
        .notEmpty()
        .withMessage('id_oauth es obligatorio')
        .custom(async (value) => {
            const user = await User.findOne({ where: { id_oauth: value } })
            if (user) {
                return Promise.reject('El id_oauth ya se encuentra registrado')
            }
        }),
    check('fullname').notEmpty().withMessage('fullname es obligatorio'),
    check('phone')
        .notEmpty()
        .withMessage('phone es obligatorio')
        .isNumeric()
        .withMessage('phone debe ser numérico'),
    check('email')
        .notEmpty()
        .withMessage('El campo email es obligatorio')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } })
            if (user) {
                return Promise.reject('El email ya está registrado')
            }
        }),
    // check('clave').notEmpty().withMessage('clave es obligatoria'),
    // check('img_profile').notEmpty().isURL().withMessage('img_profile es obligatoria y debe ser una URL válida'),
    check('ruc')
        .notEmpty()
        .withMessage('El RUC es obligatorio')
        .isNumeric()
        .withMessage('El RUC debe ser numérico')
        .isLength({ min: 11, max: 11 })
        .withMessage('El RUC debe tener exactamente 11 números'),
    // check('id_rol').notEmpty().isInt().withMessage('id_rol es obligatorio y debe ser un número entero'),

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

const validateOAuthParams = [
    query('code').notEmpty().withMessage('El parámetro "code" es obligatorio'),

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

module.exports = { validateCreateUser, validateOAuthParams }
