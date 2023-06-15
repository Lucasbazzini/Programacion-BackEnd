import  ProductManager from './ProductManager.js'

const productsUpdated = async (io) => {
    const productManager = new ProductManager('./productos.json')
    const products = productManager.getProducts()
    io.emit('productsUpdated' , products)
}

export {productsUpdated}


// const products = document.getElementById("product-container")
// Socket.on("products", (data) => {
//     const renderProducts = data.map((product) => {
//         return (
//             `
//             <div>
//             <h2>${product.title}</h2>
//             <p>Descripcion: ${product.description}</p>
//             <p>Categoria: ${product.category}</p>
//             <p>Codigo: ${product.code}</p>
//             <p>Precio: ${product.price}</p>
//             <p>Stock: ${product.stock}</p>
//             </div>`)
//     })
//     products.innerHTML = renderProducts.join('')
// })