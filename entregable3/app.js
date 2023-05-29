import express from 'express';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./productos.json');
productManager.archiveProducts(); 

const app = express();

app.use(express.json());

function generateCartId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
}

app.get('/api/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts(limit);

  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.post('/api/products', (req, res) => {
  const { title, description, price, code, stock, thumbnails } = req.body;
  productManager.addProduct(title, description, price, code, stock, thumbnails);
  res.sendStatus(201);
});

app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  productManager.updateProduct(productId, updatedProduct);
  res.sendStatus(200);
});

app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  productManager.deleteProduct(productId);
  res.sendStatus(200);
});

app.post('/api/cart', (req, res) => {
  const { products } = req.body;
  if (!products || !Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: 'Debe proporcionar productos válidos' });
    return;
  }

  const cartId = generateCartId();
  const newCart = {
    id: cartId,
    products: products
  };

  res.status(201).json({ id: cartId, message: 'Carrito creado exitosamente' });
});

const server = app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});

server.on('listening', () => {
  productManager.archiveProducts();
});
