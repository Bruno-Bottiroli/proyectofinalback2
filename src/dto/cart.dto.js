import Joi from 'joi';

export const cartDto = Joi.object({
  productos: Joi.array().items(
    Joi.object({
      producto: Joi.string().required(),
      cantidad: Joi.number().integer().min(1).required(),
    })
  ).required(),
});
