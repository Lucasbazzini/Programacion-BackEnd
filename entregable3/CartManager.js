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
    console.log('Carrito creado exitosamente');
    this.archiveCarts();
    return newCart;
  }

  getCartById(cartId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.error('No se encontró el carrito');
      return;
    }
    console.log('Carrito con el ID solicitado:', cart);
    return cart;
  }

  addToCart(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.error('No se encontró el carrito');
      return;
    }
    const existingItem = cart.products.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity++;
      console.log('Producto agregado al carrito correctamente');
    } else {
      cart.products.push({ productId, quantity: 1 });
      console.log('Producto agregado al carrito correctamente');
    }
    this.archiveCarts();
  }

  removeFromCart(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.error('No se encontró el carrito');
      return;
    }
    const index = cart.products.findIndex(item => item.productId === productId);
    if (index === -1) {
      console.error('No se encontró el producto en el carrito');
      return;
    }
    const removedProduct = cart.products.splice(index, 1);
    console.log('Producto eliminado del carrito correctamente:', removedProduct);
    this.archiveCarts();
  }

  increaseQuantity(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.error('No se encontró el carrito');
      return;
    }
    const item = cart.products.find(item => item.productId === productId);
    if (!item) {
      console.error('No se encontró el producto en el carrito');
      return;
    }
    item.quantity++;
    console.log('Cantidad incrementada correctamente');
    this.archiveCarts();
  }

  decreaseQuantity(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.error('No se encontró el carrito');
      return;
    }
    const item = cart.products.find(item => item.productId === productId);
    if (!item) {
      console.error('No se encontró el producto en el carrito');
      return;
    }
    if (item.quantity > 1) {
      item.quantity--;
      console.log('Cantidad decrementada correctamente');
    } else {
      console.log('La cantidad mínima es 1. No se puede decrementar más');
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
      console.log('Carritos cargados correctamente');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('El archivo no existe. Se creará uno nuevo.');
        this.archiveCarts();
      } else {
        console.error(error);
      }
    }
  }

  archiveCarts() {
    try {
      const jsonData = JSON.stringify(this.carts);
      fs.writeFileSync(this.path, jsonData);
      console.log('Carritos archivados correctamente');
    } catch (error) {
      console.error(error);
    }
  }
}

export default CartManager;
