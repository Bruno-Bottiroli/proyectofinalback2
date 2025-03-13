import Product from '../models/product.model.js'
import { ProductDTO } from '../dto/product.dto.js'

export const productController = {
  async addProduct(req, res) {
    try {
      const { error } = ProductDTO.validate(req.body)
      if (error) return res.status(400).json({ error: error.details[0].message })

      const { name, price, stock } = req.body

      const nuevoProducto = new Product({ name, price, stock })

      await nuevoProducto.save()

      return res.status(201).json({ message: 'Producto creado con éxito', producto: nuevoProducto })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async getAllProducts(req, res) {
    try {
      const productos = await Product.find()
      return res.json(productos)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
}