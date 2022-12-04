// -------| requires
const express = require("express");
const path = require("path");
const mainRouter = require("./routers/main.router");
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.routers");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const recordameMiddleware = require('./middlewares/recordameMiddleware')

// -------| express()
const app = express();
const serverPort = 3030;


// -------| server start
app.listen(serverPort, () => {
    console.log("Servidor corriendo OK en el puerto", serverPort);
    console.log("Visitar Digital Sound en el siguiente link: http://localhost:" + serverPort + "/");
});


// -------| middlewares (app.use)
app.use(express.static(path.join(__dirname, "../public")));  // ubicación de la carpeta "public/static" con las img/css/js, etc
app.use(express.urlencoded({ extended: false})); // preparar la app para que trabaje con metodo POST
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method")); // preparar la app para que trabaje con metodos PUT y DELETE
app.use(session({secret : 'Digitalsound123!'}))
app.use(recordameMiddleware);

// -------| template engines: ejs y path a ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


// -------| route system, requires and app.use
app.use("/", mainRouter);
app.use("/productos", productRouter);
app.use("/users", userRouter);


// Seteo inicial de error 404
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});
