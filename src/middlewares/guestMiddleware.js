function guestMiddleware(req,res,next) {
    if (req.session.usuarioLogeado == undefined) {
        next();
    } else {
        res.send('Pagina solo para invitados')
    }
}

module.exports = guestMiddleware