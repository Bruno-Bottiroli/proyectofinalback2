// src/controllers/product.controller.js
import Product from '../models/product.model.js';

export const productController = {
  async addProduct(req, res) {
    try {
      const { nombre, descripcion, precio, stock, categoria } = req.body;

      // Verificar que todos los campos estén presentes
      if (!nombre || !descripcion || !precio || !stock || !categoria) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const nuevoProducto = new Product({ nombre, descripcion, precio, stock, categoria });

      await nuevoProducto.save();

      return res.status(201).json({ message: 'Producto creado con éxito', producto: nuevoProducto });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const productos = await Product.find();
      return res.json(productos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
