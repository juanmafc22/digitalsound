const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();

const productController = require("../controllers/product.controller");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function(req, file, cb) {
        //const newFilename = `${Date.now()}_img_${path.extname(file.originalname)}`

        const newFileName = "img-prod-" + Date.now() + path.extname(file.originalname);

        console.log(file)
        console.log(file.originalname)
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

// Ruta GET para mostrar las diferentes categorias
router.get("/categoria/:id", productController.categoria);

// Ruta para el producto que viene por ruta parametrizada con req.params ID
router.get("/detalle/:id", productController.item);

// Ruta para el carrito de compras
router.get("/carrito", productController.carrito);

// Ruta para el landing page del ABM de productos
router.get("/landing-abm", productController.abm);

// Ruta GET para acceder el fomulario de creacion de productos
router.get("/creacion-producto", productController.formulario);

// Ruta para el la pag de creacion de productos, viene por POST del landing
router.post("/creacion-producto", upload.single('fotoProd'), productController.creacion);

// Ruta GET para acceder a la confirmacion de baja de productos
router.get("/baja-producto/:id", productController.confirmarBaja);

// Ruta para el la pag de baja de productos, viene por POST del landing
router.post("/baja-producto/:id", productController.eliminar);

// Ruta para el la pag de edicion de productos, viene por POST del landing
router.post("/edicion-producto", productController.editar);


module.exports = router;