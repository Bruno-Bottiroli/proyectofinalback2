
import Product from '../models/product.model.js'

export const productService = {
  
  createProduct: async (productData) => {
    try {
      const newProduct = new Product({
        nombre: productData.name,
        precio: productData.price,
        stock: productData.stock,
      });

      await newProduct.save()
      return newProduct
    } catch (error) {
      throw new Error('Error al crear el producto: ' + error.message)
    }
  },

  
  getAllProducts: async () => {
    try {
      const products = await Product.find()
      return products
    } catch (error) {
      throw new Error('Error al obtener los productos: ' + error.message)
    }
  }
}
