const fs = require("fs");
const path = require("path");
const { validationResult, body } = require('express-validator')
const bcrypt = require('bcryptjs')

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

    processLogin: (req, res) => {
        let resultValidation = validationResult(req);
        let usuarioALogearse

        if (resultValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: resultValidation.mapped()
            })
        }
        else {
            for (i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, usuarios[i].password)) {
                        usuarioALogearse = usuarios[i]
                        break;
                        
                    }
                }
            }

            if (usuarioALogearse == undefined) {
                return res.render('users/login', {
                    errors: [{msg: 'Credenciales invalidas'}]
                })
            }
        }
        
        req.session.usuarioLogeado = usuarioALogearse;
        if (req.body.remember != undefined) {
            res.cookie('recordame',
            usuarioALogearse.id,
            {maxAge: 60000})
        }

        res.redirect('/index')
    },

    // peticion por GET para acceder a la pagina de admin de usuarios
    admin: (req, res) => {

        res.render("users/abm-usuario", {usuarios});
    },

    // peticion por GET que muestra el formulario de creacion de usuario
    formulario: (req, res) => {

        res.render("users/alta-usuario");
    },

    // Peticion por POST que crea el usuario desde ABM
    creacion: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("users/alta-usuario", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let newUser = {
            "id": Date.now(),
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "email": req.body.email,
            "categoria": req.body.categoria,
            "password": bcrypt.hashSync(req.body.password, 10),
            "imagen": req.file.filename
        };

        console.log(newUser)

        usuarios.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));

        res.redirect("/users/abm-usuario");
    }


};

module.exports = usersController;

