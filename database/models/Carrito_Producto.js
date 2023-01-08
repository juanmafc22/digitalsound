let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Carrito_Producto';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        cart_id: {
            type: dataTypes.INTEGER
        }

    };

    let config = {
        tableName: 'carts_products',
        timestamps: false
    }

    let Carrito_Producto = sequelize.define(alias, cols, config)

    return Carrito_Producto
}