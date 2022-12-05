const express = require("express");
const path = require('path');
const fs = require("fs");
const multer = require('multer');
const router = express.Router(); 
const { body } = require('express-validator')

const userController = require("../controllers/user.controller");

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validationsLogin = require("../middlewares/valLoginMiddleware");
const validationAdminRegister = require("../middlewares/valAdminRegisterMiddleware");
const validationUserRegister = require("../middlewares/valUserRegisterMiddleware");

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

router.get("/login", guestMiddleware, userController.login);

router.post('/login', validationsLogin, userController.processLogin)

router.get("/registro", guestMiddleware, userController.registro);

router.post("/registro", guestMiddleware, validationUserRegister, userController.creacionUsuario);

// ruta por GET para acceder a la pagina de administracion de usuarios, solo accesible como
// usuarios admin
router.get("/abm-usuario", userController.admin)

// ruta GET para acceder al formularo de creacion de usuario admin
router.get("/alta-usuario", userController.formulario);

// ruta POST para dar de alta el nuevo usuario admin
router.post("/alta-usuario", upload.single("foto"), validationAdminRegister, userController.creacionAdmin);

module.exports = router;

