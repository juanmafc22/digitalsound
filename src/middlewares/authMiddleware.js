function authMiddleware(req,res,next) {
    if (req.session.usuarioLogeado == undefined) {
        next();
    } else {
        res.send('Pagina solo para usuarios')
    }
}

module.exports = authMiddleware