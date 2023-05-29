import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.products = [];
    this.id = 1;
    this.path = path;
    this.loadProducts();
  }

  addProduct(title, description, price, code, stock, thumbnails = []) {
    if (title && description && price && code && stock) {
      const verificationCode = this.products.some(product => product.code === code);
      if (verificationCode) {
        console.error('ERROR: El código está repetido');
      } else {
        const id = this.id++;
        const newProduct = { id, title, description, price, code, stock, thumbnails, status: true, category: '' };
        this.products.push(newProduct);
        console.log('Producto agregado correctamente');
        this.archiveProducts();
      }
    } else {
      console.error('ERROR: Debe completar todos los campos');
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      console.error('No se encontró ningún producto con ese ID');
      return;
    }
    const deletedProduct = this.products.splice(index, 1);
    console.log('Producto eliminado correctamente:', deletedProduct);
    this.archiveProducts();
  }

  updateProduct(id, newObject) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.error('No se encontró el producto');
      return;
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...newObject
    };
    this.products[productIndex] = updatedProduct;
    console.log('Producto actualizado correctamente');
    this.archiveProducts();
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.error('No se encontró el producto');
      return;
    }
    console.log('Producto con el ID solicitado:', product);
    return product;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      console.log('Productos cargados correctamente');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('El archivo no existe. Se creará uno nuevo.');
        this.archiveProducts();
      } else {
        console.error(error);
      }
    }
  }

  archiveProducts() {
    try {
      const jsonData = JSON.stringify(this.products);
      fs.writeFileSync(this.path, jsonData);
      console.log('Productos archivados correctamente');
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProductManager;