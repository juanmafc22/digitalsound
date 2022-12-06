function adminMiddleware(req,res,next) {
    if (req.session.usuarioLogeado != undefined && req.session.usuarioLogeado.categoria == 'admin') {
        next();
    } else {
        res.redirect('/users/login')
    }
}

module.exports = adminMiddleware