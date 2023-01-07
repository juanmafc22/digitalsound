let db = require("../../database/models")
const Op = db.Sequelize.Op
const url = require('url')

const cartController = {
    carrito: (req, res) => {

        let promCarrito = db.Carrito.findOne(
            // 1
            {where: [{user_id : req.session.usuarioLogeado.id},{cart_date_checkout : {[Op.eq]: null}}]
            ,include: ['producto']});
        let promProductos = db.Producto.findAll();

        Promise
        .all([promCarrito,promProductos])
        .then(([carrito, productos]) => {
            let cartProducts = carrito.producto
            let cartValue
            cartProducts.forEach(product => {
                cartValue += parseInt(product.product_price)
            })
            console.log(cartProducts)
            res.render("products/carrito", {cartProducts, cartValue, usuario : req.session.usuarioLogeado})
        })
    },
}
// 

module.exports = cartController


