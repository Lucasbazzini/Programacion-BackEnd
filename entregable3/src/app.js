import express from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const productManager = new ProductManager('./productos.json');
const cartManager = new CartManager('./carritos.json');

const app = express();

app.use(express.json());

app.use('/api/products', productsRouter(productManager));
app.use('/api/carts', cartsRouter(cartManager));

const server = app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});

server.on('listening', () => {
  productManager.archiveProducts();
  cartManager.archiveCarts();
});
