let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Perfil';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type_name: {
            type: dataTypes.STRING
        }

    };

    let config = {
        tableName: 'profiles',
        timestamps: false
    }

    let Perfil = sequelize.define(alias, cols, config)

    Perfil.associate = function(models) {
        Perfil.hasMany(models.Usuario, {
            as: 'perfil',
            foreignKey: 'user_type_id'
        })
    }

    return Perfil
}