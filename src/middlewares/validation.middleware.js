import Joi from 'joi'

export const validarRegistro = (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  next()
}

export const validarLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })

  next()
}
