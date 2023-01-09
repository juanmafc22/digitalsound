let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Carrito';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        flag_is_open: {
            type: dataTypes.INTEGER
        },
        cart_date_created: {
            type: dataTypes.DATE
        },
        cart_date_checkout: {
            type: dataTypes.DATE
        }

    };

    let config = {
        tableName: 'carts',
        timestamps: false
    }

    let Carrito = sequelize.define(alias, cols, config)

    Carrito.associate = function(models) {
        Carrito.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'user_id'
        });
        
        Carrito.belongsToMany(models.Producto, {
            as: 'producto',
            through: 'carts_products',
            foreignKey: 'cart_id',
            otherKey: 'product_id',
            timestamps: false
        })

        Carrito.hasMany(models.Carrito_Producto, {
            as: 'carrito_producto',
            foreignKey: 'cart_id'
        })
    }

    return Carrito
}