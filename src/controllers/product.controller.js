const productsController = {

    // Response de la sección Guitarras y Bajos
    guitarrasYbajos: (req, res) => {
        res.render("products/guitarras-y-bajos")
    },

    // Response para el producto/item que viene por ruta parametrizada con req.params ID
    item: (req, res) => {
        const id = req.params.id;
        res.render("products/guitarras-y-bajos-23")
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