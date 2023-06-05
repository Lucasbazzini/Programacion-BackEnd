import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.loadProducts();
    this.id = this.calculateNextId();
  }

  addProduct(title, description, price, stock, thumbnails = []) {
    if (title && description && price && stock) {
      const id = this.id++;
      const newProduct = {
        id,
        title,
        description,
        price,
        stock,
        thumbnails,
        status: true,
        category: '',
        code: this.generateCode(),
      };
      this.products.push(newProduct);

      this.archiveProducts();
    } else {
      console.log('ERROR: Debe completar todos los campos');
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return;
    }
    this.products.splice(index, 1);
    this.archiveProducts();
  }

  updateProduct(id, newObject) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return;
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...newObject,
    };
    this.products[productIndex] = updatedProduct;
    this.archiveProducts();
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
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
    } catch (error) {
      console.error(error);
    }
  }

  generateCode() {
    const code = 'CODE-' + this.id.toString().padStart(4, '0');
    return code;
  }

  calculateNextId() {
    if (this.products.length === 0) {
      return 1;
    } else {
      const maxId = this.products.reduce((max, product) => {
        return product.id > max ? product.id : max;
      }, 0);
      return maxId + 1;
    }
  }
}

export default ProductManager;
