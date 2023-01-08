const express = require("express");
const path = require('path');
const router = express.Router();

const cartController = require("../controllers/cart.controller");

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get("/", authMiddleware, cartController.carrito);

router.post('/agregar-producto/:id', authMiddleware, cartController.addProduct)

router.get('/quitar-producto/:id', authMiddleware, cartController.removeProduct)

module.exports = router