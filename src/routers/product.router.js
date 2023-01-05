const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();

const productController = require("../controllers/product.controller");

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/products');
    },
    filename: function(req, file, cb) {

        const newFileName = "img-prod-" + Date.now() + path.extname(file.originalname);

        //console.log(file)
        //console.log(file.originalname)
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

// Ruta GET para mostrar las diferentes categorias
router.get("/categoria/:id", productController.categoria);

// Ruta para el producto que viene por ruta parametrizada con req.params ID
router.get("/detalle/:id", productController.item);

// Ruta para el carrito de compras. Solo accesible a usuarios logeados.
// router.get("/carrito", authMiddleware, productController.carrito);

// Ruta para el landing page del ABM de productos
router.get("/abm-productos", adminMiddleware, productController.abm);

// Ruta GET para acceder el fomulario de creacion de productos
router.get("/creacion-producto", adminMiddleware, productController.formulario);

// Ruta para el la pag de creacion de productos, viene por POST del landing
router.post("/creacion-producto", upload.single('fotoProd'), productController.creacion);

// Ruta GET para acceder a la confirmacion de baja de productos
router.get("/baja-producto/:id", adminMiddleware, productController.confirmarBaja);

// Ruta para el la pag de baja de productos, viene por POST del landing
router.post("/baja-producto/:id", productController.eliminar);

// Ruta para el la pag de edicion de productos, viene por POST del landing
router.get("/editar/:id", adminMiddleware, productController.editar);

// Ruta para el la pag de edicion de productos, viene por POST del landing
router.post("/editar/:id",  upload.single('fotoProd'), productController.confirmarEdicion);

// Ruta GET para acceder al listado de "Nuevos ingresos"
router.get("/nuevos-ingresos", productController.nuevosIngresos)

// Ruta GET para acceder al listado de "usados"
router.get("/usados", productController.usados)

// Ruta Search
router.get("/search", productController.search)

module.exports = router;