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
        res.render("products/landing-abm")
    },

    // Reponse para la creacion un producto
    creacion: (req, res) => {
        res.render("products/alta-producto");
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