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
            "imagen": req.file.filename,
            // "imagen": req.body.fotoProd,
            "nuevo": req.body.nuevo == '1' ? true:false,
            "destacado": req.body.lanzamiento == '1' ? true:false,
            "descripcion": req.body.descripcionProd
        };

        products.push(newProduct)

        fs.writeFileSync(prodsFilePath, JSON.stringify(products, null, " "))

        let redirectPath = 'categoria/'+newProduct.categoria.toString()
        res.redirect(redirectPath)
    },

    // Reponse para baja de un producto
    confirmarBaja: (req, res) => {
        let id = req.params.id
        let producto = products.filter( product => {
            return product.id == id;
        })[0]

        res.render("products/baja-producto", {producto});
    },

    eliminar: (req,res) => {
        let idToDelete = parseInt(req.params.id)
        let productsMod = products.filter( product => {
            return product.id != idToDelete;
        })

        fs.writeFileSync(prodsFilePath, JSON.stringify(productsMod, null, " "))

        res.redirect('/productos/landing-abm')
    },

    // Reponse para editar de un producto
    editar: (req, res) => {
        let id = req.params.id
        let editable = products.find( product => {
            return product.id == id
        })

        res.render("products/edicion-producto", {editable, categories});
    },

    confirmarEdicion: (req, res) => {

        let producto = products.find( product => {
            return product.id == req.params.id
        });    

        let prodEditado = {
            "id": producto.id,
            "titulo": req.body.nombreProd,
            "categoria": parseInt(req.body.categoriaProd),
            "precio": parseInt(req.body.precioProd),
            "subtitulo": req.body.subtituloProd,
            "imagen": !req.file ? producto.imagen: req.file.filename,
            "nuevo": req.body.nuevo == '1' ? true:false,
            "destacado": req.body.lanzamiento == '1' ? true:false,
            "descripcion": req.body.descripcionProd
        };

        let productsReplace = products.filter( product => {
            return product.id != parseInt(producto.id);
        })

        productsReplace.push(prodEditado)

        console.log(req.body)
        console.log(productsReplace)

        fs.writeFileSync(prodsFilePath, JSON.stringify(productsReplace, null, " "))

        res.redirect('/productos/landing-abm')

    }


};

module.exports = productsController;