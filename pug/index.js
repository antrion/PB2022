const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

const productos = [];

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/productos", (req, res) => {
    res.render("productos", {productos});
});

app.post("/productos", (req, res) => {
    const { name, price, thumbnail } = req.body;
    const id = productos.length + 1;
    productos.push({ name, price, thumbnail, id });
    res.send({ agregado: { name, price, thumbnail, id } });
});

app.listen(8080, () => {
    console.log("Iniciado");
});