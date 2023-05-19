const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.products = [];
        this.id = 1;
        this.path = path;
        this.loadProducts(); // Agregado: Carga los productos al inicializar la instancia
    }

    addProduct(title, description, price, url, code, stock) {
        if (title && description && price && url && code && stock) {
            const verificationCode = this.products.some(product => product.code === code);
            if (verificationCode) {
                console.error("ERROR: El código está repetido");
            } else {
                let id = this.id++;
                const newProduct = { id, title, description, price, url, code, stock };
                this.products.push(newProduct);
                console.log("Producto agregado correctamente");
                this.archivarProds();
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
        this.archivarProds();
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
        this.archivarProds();
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

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(data);
            console.log("Productos cargados correctamente");
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log("El archivo no existe. Se creará uno nuevo.");
                this.archivarProds(); // Crea el archivo si no existe al cargar los productos
            } else {
                console.error(error);
            }
        }
    }

    archivarProds() {
        try {
            const jsonData = JSON.stringify(this.products);
            fs.writeFileSync(this.path, jsonData);
            console.log("Productos archivados correctamente");
        } catch (error) {
            console.error(error);
        }
    }
}

const pManager = new ProductManager('./productos.json');

pManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
pManager.addProduct("Arroz", "con atún", 20, "url", 124, 25);
pManager.addProduct("Milanesas", "con puré", 20, "url", 125, 25);
pManager.addProduct("Hamburguesa", "con queso", 20, "url", 126, 25);
pManager.addProduct("fideos", "con queso", 20, "url", 127, 25);
pManager.addProduct("fideos", "con queso", 20, "url", 128, 25);
pManager.updateProduct(4, { title: "Papas", description: "Papas fritas", price: 70, url: "google.com/fideos", code: 135, stock: 24 });
console.log(pManager.getProducts());
pManager.archivarProds();
