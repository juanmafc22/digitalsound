const fs = require("fs");
const path = require("path");

const prodsFilePath = path.join(__dirname, "../data/productos-data-base.json");
const categoriesFilePath = path.join(__dirname, "../data/categorias.json");
const products = JSON.parse(fs.readFileSync(prodsFilePath, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const productsController = {

    // Response de la sección Guitarras y Bajos
    categoria: (req, res) => {

        let id = req.params.id

        let categoria = categories.filter( categorie => {
            return categorie.id == id;
        })[0]

        console.log(categoria)

        let filtrados = products.filter ( product => {
            return product.categoria == id;
        })

        res.render("products/categoria", {categoria, filtrados});
    },

    // Response para el producto/item que viene por ruta parametrizada con req.params ID
    item: (req, res) => {

        let id = parseInt(req.params.id);

        let producto = products.filter( product => {
            return product.id == id;
        })[0]

        res.render("products/detalle-producto", {producto})
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
        res.render("products/alta-producto", {categories});
    },

    // POST para crear un producto nuevo
    creacion: (req, res) => {
        let newProduct = {
            "id": Date.now(),
            "titulo": req.body.nombreProd,
            "categoria": parseInt(req.body.categoriaProd),
            "precio": parseInt(req.body.precioProd),
            "subtitulo": req.body.subtituloProd,
            "imagen": req.body.fotoProd,
            "nuevo": req.body.nuevo == '1' ? true:false,
            "destacado": req.body.lanzamiento == '1' ? true:false,
            "descripcion": req.body.descripcionProd
        };

        products.push(newProduct)

        fs.writeFileSync(prodsFilePath, JSON.stringify(products))

        let redirectPath = 'categoria/'+newProduct.categoria.toString()
        res.redirect(redirectPath)
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