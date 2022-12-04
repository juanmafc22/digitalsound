const fs = require("fs");
const path = require("path");
const { validationResult, body } = require('express-validator')

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
        console.log(resultValidation)

        if (resultValidation.errors.length > 0) {
            console.log('Hubo errores')
            return res.render('users/login', {
                errors: resultValidation.mapped()
            })
        }
        else {
            console.log('No hubo errores')
            let usuarioALogearse
            for (i = 0; i < usuarios.length; i++) {
                console.log('Recorro el usuario' + i)
                if (usuarios[i].email == req.body.email) {
                    console.log('Coincide el mail')
                    if (req.body.password == usuarios[i].password) {
                        console.log('Coincide la pass')
                        usuarioALogearse = usuarios[i]
                        console.log('Usuario encontrado')
                        console.log(usuarioALogearse);
                        break;
                        // return res.send('Logueando a ' + usuarioALogearse.nombre);
                    }
                }
            }

            if (usuarioALogearse == undefined) {
                console.log('Cred Invalidas')
                return res.render('users/login', {
                    errors: [{msg: 'Credenciales invalidas'}]
                })
            }
        }

        

        //console.log(usuarioALogearse)

        //req.session.usuarioLogeado = usuarioALogearse;
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
            "password": req.body.password,
            "imagen": req.file.filename
        };

        console.log(newUser)

        usuarios.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));

        res.redirect("/users/abm-usuario");
    }


};

module.exports = usersController;

