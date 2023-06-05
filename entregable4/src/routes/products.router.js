import express from 'express';

function createProductsRouter(productManager, io) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const limit = req.query.limit;
    const products = productManager.getProducts(limit);
    res.json(products);
  });

  router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  });

  router.post('/', (req, res) => {
    const { title, description, price, stock, thumbnails } = req.body;
    productManager.addProduct(title, description, price, stock, thumbnails);
    res.sendStatus(201);
    io.emit('productCreated', productManager.getProductById(productManager.id - 1));
  });

  router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    productManager.updateProduct(productId, updatedProduct);
    res.sendStatus(200);
    io.emit('productUpdated', productManager.getProductById(productId));
  });

  router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    productManager.deleteProduct(productId);
    res.sendStatus(200);
    io.emit('productDeleted', productId);
  });

  return router;
}

export default createProductsRouter;
