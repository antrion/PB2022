const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const handlebars = require("express-handlebars");
const app = express();
const db = require("./productos.js");
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

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

const DB = new db("data");
const Mensajes = [];

io.on('connection', socket => {
    console.log ('conectado', socket.id)

    socket.on('mensaje', (email, mensaje) => {
        console.log(email, mensaje)
        var todayDate = new Date().toLocaleString();
        Mensajes.push({autor: email, fecha: todayDate, mensaje: mensaje})
        io.sockets.emit('listaMensajes', Mensajes)
    });
    
})

app.get("/", (req, res) => {
    async function getData(){
        try{
            const response =  await import('../data/productos.json')
            return response.json()
        }catch(err){
            return err
        }}
    res.render("main", {
            layout: "index",
            productos: getData,
    })
});

app.post("/", async (req, res) => {
    const { name, price, thumbnail } = req.body;
    const productos = await DB.getAll();
    const id = productos.length + 1;
    DB.save({name, price, thumbnail, id});
    res.render("main", {
        layout: "index",
        productos: productos,
    })
});

httpServer.listen(8080, () => {
    console.log("Iniciado");
});