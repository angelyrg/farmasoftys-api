const { check, validationResult } = require('express-validator')

const validateCreateBoleta = [
    check('user_id')
        .notEmpty()
        .withMessage('El campo "user_id" es obligatorio')
        .isNumeric()
        .withMessage('El campo "user_id" debe ser numérico'),
    check('img_boleta')
        .notEmpty()
        .withMessage('El campo "img_boleta" es obligatorio'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'Error de validación',
                errors: errors.array(),
            })
        }
        next()
    },
]

const validateUserIDParam = [
    check('user_id')
        .notEmpty()
        .withMessage('El campo "user_id" es obligatorio')
        .isNumeric()
        .withMessage('El campo "user_id" debe ser numérico'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'Error de validación',
                errors: errors.array(),
            })
        }
        next()
    },
]

module.exports = { validateCreateBoleta, validateUserIDParam }
