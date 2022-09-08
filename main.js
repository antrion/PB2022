const express = require("express");
const productosRouter = require("./productos.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);

app.use("/", express.static(__dirname + "/assets"));

app.listen(8080, () => {
    console.log("Iniciado");
});