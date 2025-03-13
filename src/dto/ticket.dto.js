import Joi from 'joi';

export const TicketDTO = Joi.object({
  usuario: Joi.string().required(),
  productos: Joi.array().items(
    Joi.object({
      producto: Joi.string().required(),
      cantidad: Joi.number().integer().min(1).required(),
      precio: Joi.number().positive().required(),
      
    })
  ).required(),
  total: Joi.number().positive().required(),
});

