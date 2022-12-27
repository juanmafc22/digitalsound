let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Promocion';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        promotion_name: {
            type: dataTypes.STRING
        },
        promotion_discount_amount: {
            type: dataTypes.FLOAT(0,2)
        }
    };

    let config = {
        tableName: 'promotions',
        timestamps: false
    }

    let Promocion = sequelize.define(alias, cols, config)

    Promocion.associate = function(models) {
        Promocion.hasMany(models.Producto, {
            as: 'promocion',
            foreignKey: 'promotion_id'
        })
    }

    return Promocion
}