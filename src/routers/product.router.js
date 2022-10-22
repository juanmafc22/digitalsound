const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Ruta de la sección Guitarras y Bajos
router.get("/guitarras-y-bajos", productController.guitarrasYbajos);

// Ruta para el producto que viene por ruta parametrizada con req.params ID
router.get("/guitarras-y-bajos/:id", productController.item);

// Ruta para el carrito de compras
router.get("/carrito", productController.carrito)

module.exports = router;