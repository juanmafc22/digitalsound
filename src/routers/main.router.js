const express = require("express");
const router = express.Router();

const mainController = require("../controllers/main.controller");

// Ruta para index.ejs
router.get("/index", mainController.index)

// Rutas extras que igual apuntan a index.ejs, para los distraidos que ingresan
// "home" o que no ingresan nada "/"
router.get("/", mainController.index)
router.get("/home", mainController.index)


module.exports = router;