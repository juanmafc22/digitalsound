const fs = require("fs");
const path = require("path");

const prodsFilePath = path.join(__dirname, "../data/productos-data-base.json");
const products = JSON.parse(fs.readFileSync(prodsFilePath, 'utf-8'));


const mainController = {

    index: (req, res) => {

        let destacados = products.filter (product => {

            return product.destacado == true;
        });

        res.render("index", {destacados});
    },

};

module.exports = mainController;