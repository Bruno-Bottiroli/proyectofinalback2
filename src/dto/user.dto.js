import Joi from 'joi'

export const userSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export class UserDTO {
  constructor({ _id, nombre, email }) {
    this.id = _id
    this.nombre = nombre
    this.email = email
  }

  static validate(user) {
    return userSchema.validate(user)
  }
}