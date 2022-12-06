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

        res.render("products/categoria", {categoria, filtrados, usuario : req.session.usuarioLogeado});
    },

    // Response para el producto/item que viene por ruta parametrizada con req.params ID
    item: (req, res) => {

        let id = parseInt(req.params.id);

        let producto = products.filter( product => {
            return product.id == id;
        })[0]

        res.render("products/detalle-producto", {producto, usuario : req.session.usuarioLogeado})
    },
    
    // Response para el carrito de compras 
    carrito: (req, res) => {
        res.render("products/carrito", {usuario : req.session.usuarioLogeado})
    },

    // Response para la pag de ABM de productos 
    abm: (req, res) => {
        res.render("products/abm-producto", {products, categories, usuario : req.session.usuarioLogeado});
    },

    // Peticon GET para acceder al formulario de creacion de productos
    formulario: (req, res) => {
        res.render("products/alta-producto", {categories, usuario : req.session.usuarioLogeado});
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

        res.render("products/baja-producto", {producto, usuario : req.session.usuarioLogeado});
    },

    eliminar: (req,res) => {
        let idToDelete = parseInt(req.params.id)
        let productsMod = products.filter( product => {
            return product.id != idToDelete;
        })

        fs.writeFileSync(prodsFilePath, JSON.stringify(productsMod, null, " "))

        res.redirect('/productos/abm-producto')
    },

    // Reponse para editar de un producto
    editar: (req, res) => {
        let id = req.params.id
        let editable = products.find( product => {
            return product.id == id
        })

        res.render("products/edicion-producto", {editable, categories, usuario : req.session.usuarioLogeado});
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

        fs.writeFileSync(prodsFilePath, JSON.stringify(productsReplace, null, " "))

        res.redirect('/productos/abm-producto')

    },

    // Response para accedor a los "nuevos ingresos"
    nuevosIngresos:  (req, res) => {

        // Refactor. Se miran todos los nuevos ingresos, luego se agrupa por cats en ejs.
        let nuevosIngresos = products.filter(product => {
            if (product.destacado == true) {
                return product;
        }})

        res.render("products/nuevos-ingresos", {nuevosIngresos, categories, usuario : req.session.usuarioLogeado});
    },

    // Response para accedor a los "usados"
    usados:  (req, res) => {

        // Refactor. Se miran todos los usados, luego se agrupa por cats en ejs.
        let productosUsados = products.filter(product => {
            if (product.nuevo == false) {
                return product;
        }})

        res.render("products/usados", {productosUsados, categories, usuario : req.session.usuarioLogeado});
    },
};

module.exports = productsController;