import fs from 'fs'

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.id = 1;
        this.path = path;
    }

    addProduct(title, description, price, url, code, stock) {
        if (title && description && price && url && code && stock) {
            const verificationCode = this.products.some(product => product.code === code);
            if (verificationCode) {
                console.error("ERROR: El codigo está repetido");
            } else {
                let id = this.id++;
                const newProduct = { id, title, description, price, url, code, stock };
                this.products.push(newProduct);
                console.log("Producto agregado correctamente");
            }
        } else {
            console.error("ERROR: Debe completar todos los campos");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.error("No se encontró ningún producto con ese ID");
            return;
        }
        const deletedProduct = this.products.splice(index, 1);
        console.log("Producto eliminado correctamente:", deletedProduct);
    }

    updateProduct(id, newObject) {
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
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("No se encontró el producto");
            return;
        }
        console.log("Producto con el ID solicitado:", product);
    }

    archivarProds() {
        const jsonData = JSON.stringify(this.products);
        fs.writeFileSync(this.path, jsonData, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Productos archivados correctamente");
                fs.readFile(this.path, "utf-8", (error, resultado) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(resultado);
                    }
                });
            }
        });
    }
}

export const pManager = new ProductManager('./productos.json');

pManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
pManager.addProduct("Arroz", "con atún", 20, "url", 124, 25);
pManager.addProduct("Milanesas", "con puré", 20, "url", 125, 25);
pManager.addProduct("Hamburguesa", "con queso", 20, "url", 126, 25);
pManager.addProduct("fideos", "con queso", 20, "url", 127, 25);
pManager.addProduct("fideos", "con queso", 20, "url", 128, 25);
pManager.updateProduct(4, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 });
console.log(pManager.getProducts());



pManager.archivarProds();