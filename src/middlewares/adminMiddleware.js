function adminMiddleware(req,res,next) {
    if (req.session.usuarioLogeado != undefined && req.session.usuarioLogeado.user_type == 'admin') {
        next();
    } else {
        res.redirect('/users/login')
    }
}

module.exports = adminMiddleware