function recordameMiddleware(req,res,next) {
    next();

    let usuarioALogearse
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        for (i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id == req.cookies.recordame) {
                usuarioALogearse = usuarios[i]
                break;
                }
            }
            req.session.usuarioLogeado = usuarioALogearse
        }
    }

module.exports = recordameMiddleware