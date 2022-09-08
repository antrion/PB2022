const express = require("express");
const { Router } = express;

const router = Router();
let productos = [];

router.get("/", (req, res) => {
    res.send({ productos });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const prod = productos[id - 1];
    if (prod) {
        res.send({ prod });
    } else {
        res.send({ error: "Producto no encontrado" });
    }
});

router.post("/", (req, res) => {
    const { name, price, thumbnail } = req.body;
    const id = productos.length + 1;
    productos.push({ name, price, thumbnail, id });
    res.send({ agregado: { name, price, thumbnail, id } });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { prod } = req.body;
    productos[id - 1] = prod;
    res.send({ actualizado: prod });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const producto = productos[id - 1];
    productos = productos.filter((prod) => prod !== productos[id - 1]);
    res.send({ eliminado: producto });
});

module.exports = router;