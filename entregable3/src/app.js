import express from 'express';
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const app = express();

app.get('/products', (req, res) => {
    const products = productManager.getProducts();
    res.send(JSON.stringify(products));
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = productManager.getProductById(productId);
    if (product) {
        res.send(JSON.stringify(product));
    } else {
        res.send("Producto no encontrado");
    }
});

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});
