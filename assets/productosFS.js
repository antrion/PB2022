const fs = require("fs");

class ProductosFS {

    constructor(productos) {
        this.archivo = `./assets/data/${productos}.json`;
    }

    async save(objProd) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const productos = JSON.parse(data);
        const id = productos.length + 1;
        objProd.id = id;
        objProd.timestamp = Date.now();
        productos.push(objProd);
        const productosString = JSON.stringify(productos);
        await fs.promises.writeFile(this.archivo,productosString);
    
        return id;
    }

    async getById(id) {
        const data = await fs.promises.readFile(this.archivo,"utf-8");
        const productos = JSON.parse(data);
        const producto = productos.find((producto) => producto.id == id);
        if (producto) {
            return producto;
        } else {
            return "Producto no encontrado";
        }
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
        const productos = JSON.parse(data);
        const productosFilter = productos.filter(item => item.id !== id)
        const productosString = JSON.stringify(productosFilter);
        await this.deleteAll();
        await fs.promises.writeFile(this.archivo,productosString);
    
        return id;
    }

    async deleteAll() {
        await fs.promises.writeFile(this.archivo,"[]");
    }
}

module.exports = ProductosFS;