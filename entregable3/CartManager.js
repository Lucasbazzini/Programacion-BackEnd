import fs from 'fs';

class CartManager {
  constructor(path) {
    this.carts = [];
    this.id = 1;
    this.path = path;
    this.loadCarts();
  }

  createCart(products = []) {
    const cartId = this.generateCartId();
    const newCart = {
      id: cartId,
      products: products.map(productId => ({ productId, quantity: 1 }))
    };
    this.carts.push(newCart);
    this.archiveCarts();
    return newCart;
  }

  getCartById(cartId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      return;
    }
    return cart;
  }

  addToCart(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      return;
    }
    const existingItem = cart.products.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    this.archiveCarts();
  }

  removeFromCart(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      return;
    }
    const index = cart.products.findIndex(item => item.productId === productId);
    if (index === -1) {
      return;
    }
    const removedProduct = cart.products.splice(index, 1);
    this.archiveCarts();
  }

  increaseQuantity(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      return;
    }
    const item = cart.products.find(item => item.productId === productId);
    if (!item) {
      return;
    }
    item.quantity++;
    
    this.archiveCarts();
  }

  loadCartsFromFile() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf8');
      const carts = JSON.parse(fileData);
      return carts;
    } catch (error) {
      return [];
    }
  }

  getAllCarts() {
    return this.carts;
  }

  decreaseQuantity(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      
      return;
    }
    const item = cart.products.find(item => item.productId === productId);
    if (!item) {
      
      return;
    }
    if (item.quantity > 1) {
      item.quantity--;
      
    } else {
      return('La cantidad mínima es 1. No se puede decrementar más');
    }
    this.archiveCarts();
  }

  generateCartId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}-${random}`;
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.archiveCarts();
      } else {
        return(error);
      }
    }
  }

  archiveCarts() {
    try {
      const jsonData = JSON.stringify(this.carts);
      fs.writeFileSync(this.path, jsonData);
    } catch (error) {
      return(error);
    }
  }
}

export default CartManager;
