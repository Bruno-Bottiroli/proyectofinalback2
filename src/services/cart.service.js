import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import Ticket from '../models/ticket.model.js';

const cartService = {
  async getCartByUser(userId) {
    return await Cart.findOne({ user: userId }).populate('products.product');
  },

  async addProductToCart(cartId, productId) {
    try {
      let cart = await Cart.findById(cartId);
      if (!cart) return null;

      const product = await Product.findById(productId);
      if (!product) return null;

      const existingProduct = cart.products.find(p => p.product.toString() === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  },

  async purchaseCart(cartId, userEmail) {
    const cart = await Cart.findById(cartId).populate('products.product');

    if (!cart) {
      return { error: 'Carrito no encontrado.' };
    }

    // Verificar stock
    const outOfStockProducts = [];
    let totalAmount = 0;

    cart.products.forEach(({ product, quantity }) => {
      if (product.stock < quantity) {
        outOfStockProducts.push({
          productId: product._id,
          missingStock: quantity - product.stock,
        });
      } else {
        product.stock -= quantity;
        totalAmount += product.price * quantity;
        product.save();
      }
    });

    if (outOfStockProducts.length > 0) {
      return { error: 'Algunos productos no tienen stock suficiente.', outOfStockProducts };
    }

    // Crear el ticket de compra
    const ticket = new Ticket({
      user: cart.user,
      total: totalAmount,
      date: new Date(),
    });

    await ticket.save();

    // Vaciar el carrito después de la compra
    cart.products = [];
    await cart.save();

    return { ticket };
  },
};

export default cartService;