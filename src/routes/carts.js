import express from "express";
import { TicketService } from "../services/ticketService.js";
import { cartModel } from "../dao/models/cart.js";
import { productModel } from "../dao/models/product.js";

const router = express.Router();
const ticketService = new TicketService();

router.post("/:cid/purchase", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate("products.product");

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    let totalAmount = 0;
    let purchasedProducts = [];
    let notPurchased = [];

    for (const item of cart.products) {
      if (item.product.stock >= item.quantity) {
        item.product.stock -= item.quantity;
        totalAmount += item.product.price * item.quantity;
        purchasedProducts.push(item.product._id);
        await item.product.save();
      } else {
        notPurchased.push(item.product._id);
      }
    }

    cart.products = cart.products.filter((item) => notPurchased.includes(item.product._id));
    await cart.save();

    if (purchasedProducts.length > 0) {
      const ticket = await ticketService.createTicket(req.user.email, totalAmount);
      return res.status(200).json({ message: "Compra realizada", ticket, notPurchased });
    }

    res.status(400).json({ message: "No se pudo realizar la compra", notPurchased });
  } catch (error) {
    res.status(500).json({ message: "Error en la compra", error });
  }
});

export default router;
