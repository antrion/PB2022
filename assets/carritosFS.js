const fs = require("fs");

class CarritosFS {

    constructor(carritos) {
        this.archivo = `./assets/data/${carritos}.json`;
    }

    async save(objCarr) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const carritos = JSON.parse(data);
        const carr = {
            "id": carritos.length + 1,
            "timestamp": Date.now(),
            "productos": []
        };
        carritos.push(carr);
        const carritosString = JSON.stringify(carritos);
        await fs.promises.writeFile(this.archivo,carritosString);
    
        return carr.id;
    }

    async getById(id) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const carritos = JSON.parse(data);
        const carrito = carritos.find((carrito) => carrito.id == id);
        if (carrito) {
            return carrito;
        } else {
            return "Producto no encontrado";
        }
    }

    async addProdToCarrito(id,prod) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const carritos = JSON.parse(data);
        carritos[id].productos.push(prod);
        const carritosString = JSON.stringify(carritos);
        await fs.promises.writeFile(this.archivo,carritosString);
    
        return prod;
    } 

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo,"utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const carritos = JSON.parse(data);
        const carritosFilter = carritos.filter(item => item.id !== id)
        const carritosString = JSON.stringify(carritosFilter);
        await fs.promises.writeFile(this.archivo,carritosString);
    
        return id;
    }

    async deleteProdById(id,idProd) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const carritos = JSON.parse(data);
        const prodFilter = carritos[id].productos.filter(item => item.id !== idProd)
        carritos[id].productos = prodFilter;
        const carritosString = JSON.stringify(prodFilter);
        await fs.promises.writeFile(this.archivo,carritosString);
    }
}

module.exports = CarritosFS;