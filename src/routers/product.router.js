const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// Ruta de la sección Guitarras y Bajos
router.get("/guitarras-y-bajos", productController.guitarrasYbajos);

// Ruta para el producto que viene por ruta parametrizada con req.params ID
router.get("/guitarras-y-bajos/:id", productController.item);

// Ruta para el carrito de compras
router.get("/carrito", productController.carrito);

// Ruta para el landing page del ABM de productos
router.get("/landing-abm", productController.abm);

// Ruta para el la pag de creacion de productos, viene por POST del landing
router.post("/creacion-producto", productController.creacion);

// Ruta para el la pag de creacion de productos, viene por POST del landing
router.get("/creacion-producto", productController.creacion);


module.exports = router;