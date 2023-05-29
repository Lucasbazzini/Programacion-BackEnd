import express from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';

const productManager = new ProductManager('./productos.json');
const cartManager = new CartManager('./carritos.json');

const app = express();

app.use(express.json());

app.get('/api/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts(limit);
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

app.post('/api/carts', (req, res) => {
  const { products } = req.body;
  if (!products || !Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: 'Debe proporcionar productos válidos' });
    return;
  }
  const cart = cartManager.createCart(products);
  res.status(201).json({ id: cart.id, message: 'Carrito creado exitosamente' });
});

app.get('/api/carts/:id', (req, res) => {
  const cartId = req.params.id;
  const cart = cartManager.getCartById(cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

app.post('/api/carts/:id/products/:productId', (req, res) => {
  const cartId = req.params.id;
  const productId = parseInt(req.params.productId);
  cartManager.addToCart(cartId, productId);
  res.sendStatus(200);
});

app.delete('/api/carts/:id/products/:productId', (req, res) => {
  const cartId = req.params.id;
  const productId = parseInt(req.params.productId);
  cartManager.removeFromCart(cartId, productId);
  res.sendStatus(200);
});

app.post('/api/carts/:id/products/:productId/increase', (req, res) => {
  const cartId = req.params.id;
  const productId = parseInt(req.params.productId);
  cartManager.increaseQuantity(cartId, productId);
  res.sendStatus(200);
});

app.post('/api/carts/:id/products/:productId/decrease', (req, res) => {
  const cartId = req.params.id;
  const productId = parseInt(req.params.productId);
  cartManager.decreaseQuantity(cartId, productId);
  res.sendStatus(200);
});

const server = app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});

server.on('listening', () => {
  productManager.archiveProducts();
  cartManager.archiveCarts();
});
