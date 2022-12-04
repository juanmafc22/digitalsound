function recordameMiddleware(req,res,next) {
    let path = require('path');
    let fs = require('fs')
    
    const usersFilePath = path.join(__dirname, "../data/usuarios.json");
    const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    let usuarioALogearse

    if (req.cookies.recordame != undefined && req.session.usuarioLogeado == undefined) {
        for (i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == req.cookies.recordame) {
                usuarioALogearse = usuarios[i]
                break;
                }
            }
            req.session.usuarioLogeado = usuarioALogearse
        }

    next();

    }

module.exports = recordameMiddleware