import { cartModel } from "../models/cart.js";

export class CartRepository {
  async getById(id) {
    return await cartModel.findById(id).populate("products.product");
  }

  async create() {
    return await cartModel.create({});
  }

  async update(id, cartData) {
    return await cartModel.findByIdAndUpdate(id, cartData, { new: true });
  }

  async delete(id) {
    return await cartModel.findByIdAndDelete(id);
  }
}
