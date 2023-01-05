let sequelize = require('sequelize');

module.exports = function(sequelize, dataTypes) {
    let alias = 'Usuario';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_first_name : {
            type: dataTypes.STRING
        },
        user_last_name : {
            type: dataTypes.STRING
        },
        user_email: {
            type: dataTypes.STRING
        },
        user_password: {
            type: dataTypes.STRING
        },
        user_image: {
            type: dataTypes.STRING
        },
        user_type: {
            type: dataTypes.STRING
        }

    };

    let config = {
        tableName: 'users',
        timestamps: false
    };

    let Usuario = sequelize.define(alias, cols, config)

    // Usuario.associate = function(models) {
    //     Usuario.belongsTo(models.Perfil, {
    //         as: 'perfil',
    //         foreignKey: 'user_type_id'
    //     })
    // }

    return Usuario
}