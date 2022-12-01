const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router(); 

const userController = require("../controllers/user.controller");

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

router.get("/registro", userController.registro);

// ruta por GET para acceder a la pagina de administracion de usuarios, solo accesible como
// usuarios admin
router.get("/landing-abm", userController.admin)

// ruta GET para acceder al formularo de creacion de usuario
router.get("/alta-usuario", userController.formulario);

// ruta POST para dar de alta el nuevo usuario admin
router.post("/creacion-usuario", upload.single("foto"), userController.creacion);

module.exports = router;

