const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

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
        
        res.redirect("users/login");

    },

    login: (req, res) => {

        res.render("users/login")
    },

    // peticion por GET para acceder a la pagina de admin de usuarios
    admin: (req, res) => {

        res.render("users/landing-abm", {usuarios});
    },

    // peticion por GET que muestra el formulario de creacion de usuario
    formulario: (req, res) => {

        res.render("users/alta-usuario");
    },

    // peticion por POST que crea el usuario
    creacion: (req, res) => {

        let newUser = {
            "id": Date.now(),
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "email": req.body.email,
            "categoria": req.body.categoria,
            "password": req.body.password,
            "imagen": req.file.filename
        };

        usuarios.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));

        res.redirect("/users/landing-abm");
    }


};

module.exports = usersController;

