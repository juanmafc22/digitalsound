const mainController = {

    index: (req, res) => {
        res.render("index");

    },

    guitarrasYbajos: (req, res) => {
        res.render("guitarras-y-bajos")
    }

};

module.exports = mainController;