import  ProductManager from './ProductManager.js'

const productsUpdated = async (io) => {
    const productManager = new ProductManager('./productos.json')
    const products = productManager.getProducts()
    io.emit('productsUpdated' , products)
}

export {productsUpdated}
