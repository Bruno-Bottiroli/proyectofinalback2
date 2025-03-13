import express from 'express';
import { productDto } from '../dto/product.dto.js';
import { productController } from '../controllers/product.controller.js';

const router = express.Router();

// Ruta para agregar un producto
router.post('/', async (req, res) => {
  try {
    const { error } = productDto.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await productController.addProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

export default router;
