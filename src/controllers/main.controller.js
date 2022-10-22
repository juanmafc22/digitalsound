const mainController = {

    index: (req, res) => {
        res.render("index");

    },

    guitarrasYbajos: (req, res) => {
        res.render("guitarras-y-bajos")
    },

    carrito: (req, res) => {
        res.render("carrito.ejs")
    }

};

module.exports = mainController;