const express = require("express");
const { Router } = express;
const productoFS = require("../assets/productosFS");

const productos = new productoFS('productos')

const router = Router();

router.get("/", async (req, res) => {
    const prod = await productos.getAll();
    res.render("main", {
        layout: "productos",
        productos: prod,
    })
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const prod = await productos.getById(id);
    if (prod) {
        res.send({ prod });
    } else {
        res.send({ error: "Producto no encontrado" });
    }
});

router.post("/", (req, res) => {
    const { name, desc, code, thumbnail, price, stock } = req.body;
    const prod = productos.save({name, desc, code, thumbnail, price, stock });
    res.send({ "producto agregado": prod });
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