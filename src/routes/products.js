import express from "express";
import { ProductService } from "../services/productService.js";

const router = express.Router();
const productService = new ProductService();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
});

// Crear un nuevo producto (solo admin)
router.post("/", async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
});

// Actualizar un producto (solo admin)
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
});

// Eliminar un producto (solo admin)
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
});

export default router;
