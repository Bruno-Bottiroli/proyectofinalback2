import Joi from 'joi'

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});

export class ProductDTO {
  constructor({ _id, name, price, stock }) {
    this.id = _id
    this.name = name
    this.price = price
    this.stock = stock
  }

  static validate(product) {
    return productSchema.validate(product)
  }
}