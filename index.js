const express = require("express");
const { Server: HTTPServer } = require("http");
const handlebars = require("express-handlebars");
const app = express();
const productosRouter = require("./router/productosRouter");
const carritosRouter = require("./router/carritosRouter")
const httpServer = new HTTPServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("views/"));

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

app.get("/", (req, res) => {
    res.render("main", {
        layout: "index",
    })
});

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritosRouter);

httpServer.listen(8080, () => {
    console.log("Iniciado");
});