import Joi from 'joi';

export const productDto = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    precio: Joi.number().required(),
    stock: Joi.number().required(),
    categoria: Joi.string().required(),
});
