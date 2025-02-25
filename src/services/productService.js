import { ProductRepository } from "../dao/repositories/productRepository.js";

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts() {
    return await this.productRepository.getAll();
  }

  async getProductById(id) {
    return await this.productRepository.getById(id);
  }

  async createProduct(productData) {
    return await this.productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}
