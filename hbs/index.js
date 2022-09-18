const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    "hbs",
    handlebars.engine({
        extname:"hbs",  
        defaultLayout: "index",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);

app.set("views", "./views");
app.set("view engine", "hbs");

const productos = [];

app.get("/", (req, res) => {
    res.render("main", {
        layout: "index",
    })
});

app.get("/productos", (req, res) => {
    res.render("main", {
        layout: "productos",
        productos: productos,
    })
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