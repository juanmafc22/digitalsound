const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/guitarras-y-bajos", productController.guitarrasYbajos);

router.get("/guitarras-y-bajos/:id", productController.item);

module.exports = router;