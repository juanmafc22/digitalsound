const fs = require("fs");
const path = require("path");
const db = require("../../database/models")

// const prodsFilePath = path.join(__dirname, "../data/productos-data-base.json");
// const products = JSON.parse(fs.readFileSync(prodsFilePath, 'utf-8'));


const mainController = {

    index: (req, res) => {

        db.Producto.findAll({
            where: {flag_hot_product: 1}
        })
        .then(destacados => {
        console.log(req.session.usuarioLogeado)
        res.render("index", {destacados, usuario : req.session.usuarioLogeado});
        })
    },

};

module.exports = mainController;