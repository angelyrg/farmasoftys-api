const { validationResult, check } = require('express-validator')

const validateCreateTiendaRegistroSolicitud = [
    check('name').notEmpty().withMessage('El campo nombre es obligatorio'),
    check('manager_name')
        .notEmpty()
        .withMessage('El nombre del representante es obligatorio'),
    check('address')
        .notEmpty()
        .withMessage('La campo dirección es obligatorio'),
    check('phone')
        .notEmpty()
        .withMessage('El número de contacto es obligatorio'),
    check('email')
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio'),


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


module.exports = { validateCreateTiendaRegistroSolicitud }
