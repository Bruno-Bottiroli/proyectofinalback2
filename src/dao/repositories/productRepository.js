import { productModel } from "../models/product.js";

export class ProductRepository {
  async getAll() {
    return await productModel.find();
  }

  async getById(id) {
    return await productModel.findById(id);
  }

  async create(productData) {
    return await productModel.create(productData);
  }

  async update(id, productData) {
    return await productModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await productModel.findByIdAndDelete(id);
  }
}
