const { body } = require('express-validator')

module.exports = [
    body('nombre').notEmpty().withMessage('Necesitas completar tu nombre'),
    body('apellido').notEmpty().withMessage('Necesitas completar tu apellido'),
    body('email')
        .notEmpty().withMessage('Necesitas ingresar un email').bail()
        .isEmail().withMessage('Necesitas ingresar un email valido').bail()
        .custom((value) => {
            let usersFilePath = path.join(__dirname, "../data/usuarios.json");
            let usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

            for (i = 0; i < usuarios.length; i++) {
                if (value == usuarios[i].email) {
                    throw new Error('Este email ya se encuentra registrado')
                }
            }

            return true
        }),
    body('password')
        .notEmpty().withMessage('Necesitas ingresar una contraseña').bail()
        .isStrongPassword().withMessage('La contraseña necesita al menos: 8 char, 1 num, 1 may, 1 min, 1 simbolo'),
    body('password2')
        .notEmpty().withMessage('Necesitas repetir la constraseña').bail()
        .custom((value, { req }) => {
            let oldPass = req.body.password;
            if (oldPass != value) {
                throw new Error('Las contraseñas no coinciden')
            }
            
            return true
        })
]