const express = require("express");
const router = express.Router(); 

const userController = require("../controllers/user.controller");

router.get("/login", userController.login);

router.get("/registro", userController.registro);

// ruta por GET para acceder a la pagina de administracion de usuarios, solo accesible como
// usuarios admin
router.get("/admin-usuarios", userController.admin)

module.exports = router;

