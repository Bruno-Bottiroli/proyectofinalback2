import { CartRepository } from "../dao/repositories/cartRepository.js";

export class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async getCartById(id) {
    return await this.cartRepository.getById(id);
  }

  async createCart() {
    return await this.cartRepository.create();
  }

  async updateCart(id, cartData) {
    return await this.cartRepository.update(id, cartData);
  }

  async deleteCart(id) {
    return await this.cartRepository.delete(id);
  }
}
