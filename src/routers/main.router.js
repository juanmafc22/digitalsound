const express = require("express");
const router = express.Router();

const mainController = require("../controllers/main.controller");

router.get("/", mainController.index)
router.get("/index", mainController.index)
router.get("/home", mainController.index)
router.get("/cart", mainController.carrito)


module.exports = router;