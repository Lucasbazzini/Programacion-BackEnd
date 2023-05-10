//---Actividad---
const fs = require("fs")
class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
        this.path = fs.readFile('./main.txt')
    }

    addProduct(title, description, price, url, code, stock) {
        if (title && description && price && url && code && stock) {
            const verificationCode = this.products.some(product => product.code === code)
            if (verificationCode) {
                console.error("ERROR: El codigo esta repetido")
            } else {
                let id = this.id++;
                const newProduct = { id, title, description, price, url, code, stock };
                this.products.push(newProduct);
            }
        } else {
            console.error("ERROR: Debe completar todos los campos")
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id)
        const deleteID = this.products.splice(index, 1)
        if (index === -1) {
            return console.log("Nothing id found")
        } else {
            return deleteID
        }
    }

    updateProduct(id, newObject) {
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            console.error("Product not found");
            return;
        }
        const updatedProduct = {
            ...this.products[productIndex],
            ...newObject
        };
        this.products[productIndex] = updatedProduct;
        console.log("Product updated successfully");
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productID = this.products.find(product => product.id === id);
        if (!productID) {
            return console.error("Not found")
        } else {
            return console.log("Producto con el ID solicitado: ", productID)
        }
    }
}

const pManager = new ProductManager()

pManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
pManager.addProduct("Arroz", "con atun", 20, "url", 124, 25);
pManager.addProduct("Milanesas", "con pure", 20, "url", 125, 25);
pManager.addProduct("Hamburguesa", "con queso", 20, "url", 126, 25);
pManager.updateProduct(4, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 })
console.log(pManager.getProducts())
pManager.sendDataFs()