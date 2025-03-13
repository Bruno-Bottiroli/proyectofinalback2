import Joi from 'joi';

export const cartSchema = Joi.object({
  user: Joi.string().required(),
  products: Joi.array().items(Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  })).required(),
});

export class CartDTO {
  constructor({ _id, user, products }) {
    this.id = _id;
    this.user = user;
    this.products = products.map(p => ({
      product: p.product,
      quantity: p.quantity,
    }));
  }

  static validate(cart) {
    return cartSchema.validate(cart);
  }
}