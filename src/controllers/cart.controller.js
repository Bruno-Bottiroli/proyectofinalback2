import cartService from '../services/cart.service.js';

export const cartController = {

  async createCart(req, res) {
    try {
      const userId = req.user.id; // Se obtiene del usuario autenticado
      const cart = await cartService.createCart(userId);

      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el carrito.', error: error.message });
    }
  },

  async getCartByUser(req, res) {
    try {
      const userId = req.user.id; // Se obtiene del usuario autenticado
      const cart = await cartService.getCartByUser(userId);

      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado para este usuario.' });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito.', error: error.message });
    }
  },

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartService.addProductToCart(cid, pid);

      if (!cart) {
        return res.status(404).json({ message: 'Carrito o producto no encontrado.' });
      }

      res.status(200).json({ message: 'Producto agregado al carrito.', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar producto al carrito.', error: error.message });
    }
  },

  async purchaseCart(req, res) {
    const { cid } = req.params;
    try {
      const purchaseResult = await cartService.purchaseCart(cid, req.user.email);

      if (purchaseResult.error) {
        return res.status(400).json({ message: purchaseResult.error });
      }

      res.status(200).json({ message: 'Compra realizada con éxito', ticket: purchaseResult.ticket });
    } catch (error) {
      res.status(500).json({ message: 'Error al realizar la compra.', error: error.message });
    }
  },
};
