const { check, validationResult } = require('express-validator')

const { RETIRO_STATUS } = require('../constants/retiro.constant')

const validateCreateRetiro = [
    check('user_id')
        .notEmpty()
        .withMessage('El campo user_id es obligatorio')
        .isNumeric()
        .withMessage('El campo user_id debe ser numérico'),
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

const validateUpdateRetiro = [
    check('request_date')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Debe ser una fecha válida en formato ISO'),
    check('requested_amount')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Debe ser un número decimal válido')
        .custom((value) => parseFloat(value) > 0)
        .withMessage('Debe ser mayor que cero'),
    check('paid_amount')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('Debe ser un número decimal válido'),
    check('payment_date')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Debe ser una fecha válida en formato ISO'),
    check('comment')
        .optional()
        .isString()
        .withMessage('El comentario debe ser texto'),
    check('status')
        .optional()
        .custom((value) => Object.values(RETIRO_STATUS).includes(Number(value)))
        .withMessage('Estado inválido'),

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

module.exports = { validateCreateRetiro, validateUpdateRetiro }
