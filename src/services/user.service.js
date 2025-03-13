import User from '../models/user.model.js'
import Cart from '../models/cart.model.js'
import bcrypt from 'bcrypt'

export const registrarUsuario = async (nombre, email, password) => {
  const usuarioExistente = await User.findOne({ email })
  if (usuarioExistente) throw new Error('El email ya está registrado')

  const hashedPassword = await bcrypt.hash(password, 10)
  const usuario = new User({ nombre, email, password: hashedPassword })

  await usuario.save()


  const nuevoCarrito = new Cart({
    user: usuario._id,
    products: [],
  });

  await nuevoCarrito.save()

  return usuario, nuevoCarrito
};

export const obtenerUsuarioPorEmail = async (email) => {
  return await User.findOne({ email })
};

export const verificarPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
};
