const fs = require("fs");
const path = require("path");

const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));



const usersController = {
    // peticion get para acceder al formulario de registro??
    registro: (req, res) => {
        res.render("users/registro")
    },

    // POST para crear un usuario nuevo

    creacionUsuario: (req, res) => {

        let newUsuario = {
            "id": Date.now(),
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "email": req.body.email,
            //"categoria": "usuario",
            "password": req.body.contraseña,
            //"imagen": "img-usuarios-1666987149191.png" 

           
        };

        usuarios.push(newUsuario);

        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuario, null, " "));
        
        res.redirect("/login");

    },

    login: (req, res) => {
        res.render("users/login")
    },


};

module.exports = usersController;

