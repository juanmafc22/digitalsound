const fs = require("fs");
const path = require("path");

const prodsFilePath = path.join(__dirname, "../data/productos-data-base.json");
const products = JSON.parse(fs.readFileSync(prodsFilePath, 'utf-8'));

const productsController = {

    // Response de la sección Guitarras y Bajos
    categoria: (req, res) => {

        let id = req.params.id

        let filtrados = products.filter ( product => {
            return product.categoria == id;
        })

        res.render("products/categoria", {filtrados});
    },

    // Response para el producto/item que viene por ruta parametrizada con req.params ID
    item: (req, res) => {

        let id = parseInt(req.params.id);

        let producto = products.filter( product => {
            return product.id == id;
        })[0]

        res.render("products/guitarras-y-bajos-23", {producto})
    },
    
    // Response para el carrito de compras 
    carrito: (req, res) => {
        res.render("products/carrito")
    },

    // Response para la pag de ABM de productos 
    abm: (req, res) => {

        let guitarras = products.filter (product => {
            return product.categoria == 1;
        });

        let baterias = products.filter (product => {
            return product.categoria == 2;
        });

        let amplificadores = products.filter (product => {
            return product.categoria == 3;
        });

        let accesorios = products.filter (product => {
            return product.categoria == 4;
        });

        res.render("products/landing-abm", {guitarras, baterias, amplificadores, accesorios});
    },

    // Peticon GET para acceder al formulario de creacion de productos
    formulario: (req, res) => {
        res.render("products/alta-producto");
    },

    // POST para crear un producto nuevo
    creacion: (req, res) => {
        let newProduct = {
            "id": Date.now(),
            "titulo": req.body.nombre-prod,
            "categoria": 4,
            "precio": req.body.precio-prod,
            "subtitulo": req.body.subtitulo-prod,
            "imagen": req.body.foto-prod,
            "nuevo": req.body.nuevo,
            "destacado": true,
            "descripcion": "Donec eget blandit nunc, eu tempus quam. Suspendisse et pretium urna, in aliquam mauris. Duis cursus porttitor magna, id hendrerit mauris porta pretium. Sed sit amet facilisis nunc. "
        }

        console.log(req.body);
    },

    // Reponse para baja de un producto
    baja: (req, res) => {
        res.render("products/baja-producto");
    },

    // Reponse para editar de un producto
    editar: (req, res) => {
        res.render("products/edicion-producto");
    },


};

module.exports = productsController;