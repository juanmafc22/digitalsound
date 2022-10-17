const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/guitarras-y-bajos", productController.guitarrasYbajos)

module.exports = router;