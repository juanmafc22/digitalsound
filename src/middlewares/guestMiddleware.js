function guestMiddleware(req,res,next) {
    if (req.session.usuarioLogeado == undefined) {
        next();
    } else {
        res.render('users/profile', {usuario : req.session.usuarioLogeado})
    }
}

module.exports = guestMiddleware