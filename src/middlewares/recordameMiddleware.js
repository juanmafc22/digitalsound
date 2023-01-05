let path = require('path');
let fs = require('fs');
const db = require("../../database/models");

function recordameMiddleware(req,res,next) {

    if (req.cookies.recordame != undefined && req.session.usuarioLogeado == undefined) {
        db.Usuario.findByPk(req.cookies.recordame)
        .then(usuario => {
            req.session.usuarioLogeado = usuario
            console.log(req.session.usuarioLogeado)
        })
    }

    next();

}

module.exports = recordameMiddleware