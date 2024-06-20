const { query, validationResult } = require('express-validator')

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

module.exports = { validateRUCParams }
