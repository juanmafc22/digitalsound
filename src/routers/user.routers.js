const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router(); 
const { body } = require('express-validator')

const userController = require("../controllers/user.controller");
const usersController = require("../controllers/user.controller");

const validations = [
    body('nombre').notEmpty().withMessage('Necesitas completar tu nombre'),
    body('apellido').notEmpty().withMessage('Necesitas completar tu apellido'),
    body('email')
        .notEmpty().withMessage('Necesitas ingresar un email').bail()
        .isEmail().withMessage('Necesitas ingresar un email valido'),
    body('password')
        .notEmpty().withMessage('Necesitas ingresar una contraseña').bail()
        .isStrongPassword().withMessage('La contraseña necesita al menos: 8 char, 1 num, 1 may, 1 min, 1 simbolo'),
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

const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Ingrese su email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    body('password')
        .notEmpty().withMessage('Ingrese su contraseña')
]

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/users');
    },
    filename: function(req, file, cb) {

        const newFileName = "img-usuarios-" + Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

router.get("/login", userController.login);

router.post('/login', validationsLogin, usersController.processLogin)

router.get("/registro", userController.registro);

// ruta por GET para acceder a la pagina de administracion de usuarios, solo accesible como
// usuarios admin
router.get("/abm-usuario", userController.admin)

// ruta GET para acceder al formularo de creacion de usuario admin
router.get("/alta-usuario", userController.formulario);

// ruta POST para dar de alta el nuevo usuario admin
router.post("/alta-usuario", upload.single("foto"), validations, userController.creacion);

module.exports = router;

