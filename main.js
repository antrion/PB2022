const express = require("express");
const db = require("./contenedor.js");
const app = express();

// middleware https://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded());
// middleware https://expressjs.com/es/api.html#express.json
app.use(express.json());
//* request/ response
const DB = new db("data");


app.get("/", (req, res) => {
    res.send({ error: false });
});

//getAll
app.get("/productos", async (req, res) => {
    const data = await DB.getAll();
    return res.send(data);
});

app.get("/productosRandom", async (req, res) => {
const data = await DB.getAll();

function numAleatorio(num) {
    return parseInt(Math.random() * num + 1);
}

const size = Object.keys(data);
const id = numAleatorio(size.length)
const randomProd = await DB.getById(id);

return res.send(randomProd);  
});

app.listen(8080, () => {
    console.log("Iniciado");
});