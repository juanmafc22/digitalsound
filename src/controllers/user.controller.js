const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {

    registro: (req, res) => {

        res.render("users/registro")
    },

    login: (req, res) => {

        res.render("users/login")
    },

    // peticion por GET para acceder a la pagina de admin de usuarios
    admin: (req, res) => {

        res.render("users/admin-usuarios", {usuarios});
    }


};

module.exports = usersController;

