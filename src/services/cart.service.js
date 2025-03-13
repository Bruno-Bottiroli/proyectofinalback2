import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'
import Ticket from '../models/ticket.model.js'
import { mailService } from './mail.service.js'

const cartService = {
  async getCartByUser(userId) {
    return await Cart.findOne({ user: userId }).populate('products.product')
  },

  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId)
    const product = await Product.findById(productId)

    if (!cart || !product) {
      throw new Error('Carrito o producto no encontrado.')
    }

    const productInCart = cart.products.find(p => p.product.toString() === productId)

    if (productInCart) {
      productInCart.quantity += 1
    } else {
      cart.products.push({ product: productId, quantity: 1 })
    }

    await cart.save()
    return cart
  },

  async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId)

    if (!cart) {
      throw new Error('Carrito no encontrado.')
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId)

    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito.')
    }

    cart.products.splice(productIndex, 1)

    await cart.save()
    return cart
  },

  async purchaseCart(cartId, userEmail) {
    const cart = await Cart.findById(cartId).populate('products.product')

    if (!cart) {
      throw new Error('Carrito no encontrado.')
    }

    const total = cart.products.reduce((acc, item) => {
      if (isNaN(item.product.price)) {
        throw new Error('El precio de un producto no es un número válido.');
      }
      return acc + item.product.price * item.quantity;
    }, 0);

    if (isNaN(total)) {
      throw new Error('El total de la compra no es un número válido.');
    }

    const ticket = new Ticket({
      user: cart.user,
      total: total,
      date: new Date(),
    })

    await ticket.save()

    cart.products = []
    await cart.save()
   
    await mailService.sendMail({
      to: userEmail,
      subject: 'Gracias por tu compra',
      type: 'THANK_YOU',
    });

    return { ticket }
  },
};

export default cartService