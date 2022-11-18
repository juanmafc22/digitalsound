const express = require("express");
const usersController = require("../controllers/user.controller");
const router = express.Router(); 

const userController = require("../controllers/user.controller");

router.get("/login", userController.login);

router.get("/registro", userController.registro);

router.post("/registro", usersController.creacionUsuario);

module.exports = router;

