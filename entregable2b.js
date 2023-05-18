const fs = require("fs").promises;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.id = 1;
        this.path = path;
    }

    async addProduct(title, description, price, url, code, stock) {
        if (title && description && price && url && code && stock) {
            const verificationCode = this.products.some(product => product.code === code);
            if (verificationCode) {
                console.error("ERROR: El codigo está repetido");
            } else {
                let id = this.id++;
                const newProduct = { id, title, description, price, url, code, stock };
                this.products.push(newProduct);
                console.log("Producto agregado correctamente");
                await this.archivarProds();
            }
        } else {
            console.error("ERROR: Debe completar todos los campos");
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error("No se encontró ningún producto con ese ID");
            return;
        }
        const deletedProduct = this.products.splice(index, 1);
        console.log("Producto eliminado correctamente:", deletedProduct);
        await this.archivarProds();
    }

    async updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.error("No se encontró el producto");
            return;
        }
        const updatedProduct = {
            ...this.products[productIndex],
            ...newObject
        };
        this.products[productIndex] = updatedProduct;
        console.log("Producto actualizado correctamente");
        await this.archivarProds();
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("No se encontró el producto");
            return;
        }
        return("Producto con el ID solicitado:", product);
    }

    async archivarProds() {
        try {
            const jsonData = JSON.stringify(this.products);
            await fs.writeFile(this.path, jsonData);
            const resultado = await fs.readFile(this.path, "utf-8");
            return(resultado);
        } catch (error) {
            console.error(error);
        }
    }
}

const pManager = new ProductManager('./productosb.json');

pManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
pManager.addProduct("Arroz", "con atún", 20, "url", 124, 25);
pManager.addProduct("Milanesas", "con puré", 20, "url", 125, 25);
pManager.addProduct("Hamburguesa", "con queso", 20, "url", 126, 25);
pManager.addProduct("fideos", "con queso", 20, "url", 127, 25);
pManager.addProduct("fideos", "con queso", 20, "url", 128, 25);
pManager.updateProduct(4, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 });
pManager.getProducts();
