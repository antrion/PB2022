const express = require("express");
const { Router } = express;
const carritoFS = require("../assets/carritosFS");

const carritos = new carritoFS('carritos')

const router = Router();

router.get("/", async (req, res) => {
    const carr = await carritos.getAll();
    res.render("main", {
        layout: "carritos",
        carritos: carr,
    })
});

router.get("/:id/productos", (req, res) => {
    const { id } = req.params;
    const carr = carritos[id - 1];
    if (carr) {
        res.send({ carr });
    } else {
        res.send({ error: "Carrito no encontrado" });
    }
});

router.post("/", (req, res) => {
    const carr = carritos.save();
    res.send({ "Carrito agregado": carr });
});

router.post("/:id/productos", (req, res) => {
    const prod = req.body;
    const id = req.params;
    const addProd = carritos.addProdToCarrito(id,prod);
    res.send({ "Carrito agregado": addProd });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleteCarrito = carritos.deleteById(id);
    res.send({ "Carrito Eliminado": deleteCarrito });
});

router.delete("/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    const deleteProd = carritos.deleteProdById(id,id_prod);
    res.send({ "Carrito Eliminado": deleteProd });
});

module.exports = router;