const { body } = require('express-validator')
const path = require('path')
const db = require("../../database/models");

module.exports = [
    body('nombre').notEmpty().withMessage('Necesitas completar tu nombre'),
    body('apellido').notEmpty().withMessage('Necesitas completar tu apellido'),
    body('email')
        .notEmpty().withMessage('Necesitas ingresar un email').bail()
        .isEmail().withMessage('Necesitas ingresar un email valido')
        .custom((value) => {
            return db.Usuario.findOne({
                where: {
                    user_email: value
                }
            })
            .then(user => {
                if(user) {
                    return Promise.reject('Este email ya se encuentra registrado')
                } 
            })
        }),
    body('password')
        .notEmpty().withMessage('Necesitas ingresar una contraseña').bail()
        .isStrongPassword().withMessage('La contraseña necesita: 8 Caracteres, 1 Número, 1 Mayusc, 1 Minusc, 1 Símbolo'),
    body('password2')
        .notEmpty().withMessage('Necesitas repetir la constraseña').bail()
        .custom((value, { req }) => {
            let oldPass = req.body.password;
            if (oldPass != value) {
                throw new Error('Debe coincidir con la contraseña ingresada')
            }
            
            return true
        }),
    body('foto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif']
        if (!file) {
            throw new Error('Necesitas subir una imagen')
        }   
        else {
            let fileExtension = path.extname(file.originalname);

            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    })
]