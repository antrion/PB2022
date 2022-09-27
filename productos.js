const fs = require("fs");

class Productos {

    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(objProd) {
        // * Se lee el archivo para obtener la cantidad de productos y generar un nuevo id
        const data = await fs.promises.readFile(`${this.archivo}/productos.json`,"utf-8");
        const productos = JSON.parse(data);
        const id = productos.length + 1;
        objProd.id = id;
        // * { name: string, price: int, thumbnail: string, id: id }
        productos.push(objProd);
        const productosString = JSON.stringify(productos);
        await fs.promises.writeFile(`${this.archivo}/productos.json`,productosString);
    
        return id;
    }

    async getById(id) {
        const data = await fs.promises.readFile(`${this.archivo}/productos.json`,"utf-8");
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
            const data = await fs.promises.readFile(`${this.archivo}/productos.json`,"utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        // * Se lee el archivo para obtener la cantidad de productos y generar un nuevo id
        const data = await fs.promises.readFile(`${this.archivo}/productos.json`,"utf-8");
        const productos = JSON.parse(data);
        const productosFilter = productos.filter(item => item.id !== id)
        const productosString = JSON.stringify(productosFilter);
        await this.deleteAll();
        await fs.promises.writeFile(`${this.archivo}/productos.json`,productosString);
    
        return id;
    }

    async deleteAll() {
        await fs.promises.writeFile(`${this.archivo}/productos.json`,"[]");
    }
}

module.exports = Productos;