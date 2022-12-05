const { body } = require('express-validator')

module.exports = [
    body('email')
        .notEmpty().withMessage('Ingrese su email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    body('password')
        .notEmpty().withMessage('Ingrese su contraseña')
]

