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
        res.render("products/carrito.ejs")
    },

    // Response para la creacion de un producto
    abm: (req, res) => {
        res.render("products/landing-abm.ejs")
    }

};

module.exports = productsController;