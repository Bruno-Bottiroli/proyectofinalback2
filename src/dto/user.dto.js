import Joi from 'joi';

export const userDto = Joi.object({
  name: Joi.string().required(),
    lastname: Joi.string().required(),
  email: Joi.string().email().required(),
    password: Joi.string().required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});