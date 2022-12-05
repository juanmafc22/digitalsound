function authMiddleware(req,res,next) {
    if (req.session.usuarioLogeado != undefined) {
        next();
    } else {
        res.redirect('/users/login')
    }
}

module.exports = authMiddleware