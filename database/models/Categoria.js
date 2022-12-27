let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Categoria';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING
        }

    };

    let config = {
        tableName: 'categories',
        timestamps: false
    }

    let Categoria = sequelize.define(alias, cols, config)

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Producto, {
            as: 'categoria',
            foreignKey: 'category_id'
        })
    }

    return Categoria
}