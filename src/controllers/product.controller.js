const productsController = {

    guitarrasYbajos: (req, res) => {
        res.render("guitarras-y-bajos")
    },

    item: (req, res) => {

        const id = req.params.id;

        res.render("guitarras-y-bajos-23")
    },



};

module.exports = productsController;