let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Producto';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name : {
            type: dataTypes.STRING
        },
        product_description_short : {
            type: dataTypes.STRING
        },
        product_description_long : {
            type: dataTypes.STRING
        },
        product_price: {
            type: dataTypes.FLOAT(11,2)
        },
        product_images: {
            type: dataTypes.STRING
        },
        flag_hot_product: {
            type: dataTypes.INTEGER
        },
        flag_used_product: {
            type: dataTypes.INTEGER
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        promotion_id: {
            type: dataTypes.INTEGER
        }

    };

    let config = {
        tableName: 'products',
        timestamps: false
    };

    let Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models) {
        Producto.belongsTo(models.Categoria, {
            as: 'categoria',
            foreignKey: 'category_id'
        });

        Producto.belongsTo(models.Marca, {
            as: 'marca',
            foreignKey: 'brand_id'
        });

        Producto.belongsTo(models.Promocion, {
            as: 'promocion',
            foreignKey: 'promotion_id'
        });

        Producto.belongsToMany(models.Carrito, {
            as: 'carrito',
            through: 'carts_products',
            foreignKey: 'product_id',
            otherKey: 'cart_id',
            timestamps: false
        })

    }

    return Producto
}