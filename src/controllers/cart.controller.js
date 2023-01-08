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
            res.render("products/carrito", {cartProducts, cartValue, usuario : req.session.usuarioLogeado})
        })
    },
    addProduct: (req, res) => {
        db.Carrito.findOne(
            {where: [{user_id : req.session.usuarioLogeado.id},{cart_date_checkout : {[Op.eq]: null}}]}
        )
        .then(carrito => {
            db.Carrito_Producto.create({
                cart_id: carrito.id,
                product_id: req.params.id
            })
        }).then(result => {
            res.redirect('/cart')
        })
    },
    removeProduct: (req,res) => {
        db.Carrito.findOne(
            {where: [{user_id : req.session.usuarioLogeado.id},{cart_date_checkout : {[Op.eq]: null}}]}
        )
        .then(carrito => {
            db.Carrito_Producto.destroy({
                where: [{product_id: req.params.id}, {cart_id : carrito.id}]
            })
        }).then(result => {
            res.redirect('/cart')
        })
    }
}
// 

module.exports = cartController


