let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Marca';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: dataTypes.STRING
        }

    };

    let config = {
        tableName: 'brands',
        timestamps: false
    }

    let Marca = sequelize.define(alias, cols, config)

    Marca.associate = function(models) {
        Marca.hasMany(models.Producto, {
            as: 'marca',
            foreignKey: 'brand_id'
        })
    }

    return Marca
}