const productsController = {

    // Response de la sección Guitarras y Bajos
    guitarrasYbajos: (req, res) => {
        res.render("guitarras-y-bajos")
    },


    // Responde para el producto/item que viene por ruta parametrizada con req.params ID
    item: (req, res) => {
        const id = req.params.id;
        res.render("guitarras-y-bajos-23")
    },
    
    // Respose para el carrito de compras 
    carrito: (req, res) => {
        res.render("carrito.ejs")
    }



};

module.exports = productsController;