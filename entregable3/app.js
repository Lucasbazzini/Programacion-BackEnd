import express from 'express';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./productos.json');

const app = express();

app.get('/products', (req, res) => {
  const limit = req.query.limit; 
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit)); 
  }

  res.send(JSON.stringify(products));
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productManager.getProductById(productId);
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.send('Producto no encontrado');
  }
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
