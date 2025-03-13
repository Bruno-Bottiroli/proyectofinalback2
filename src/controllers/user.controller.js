import User from '../models/user.model.js'
import Cart from '../models/cart.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserDTO } from '../dto/user.dto.js'


const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
};

export const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body
  const { error } = UserDTO.validate({ nombre, email, password })
  if (error) return res.status(400).json({ message: error.details[0].message })

  const usuarioExistente = await User.findOne({ email })
  if (usuarioExistente) return res.status(400).json({ message: 'El email ya está registrado' })

  const hashedPassword = await bcrypt.hash(password, 10)
  const usuario = new User({ nombre, email, password: hashedPassword })

  await usuario.save()

  
  const nuevoCarrito = new Cart({
    user: usuario._id,
    products: [],
  })

  await nuevoCarrito.save()

  const token = generateToken(usuario)

  res.cookie('token', token, { httpOnly: true })

  return res.status(201).json({ usuario, nuevoCarrito, token })
}

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body
  const usuario = await User.findOne({ email })
  if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' })

  const isPasswordValid = await bcrypt.compare(password, usuario.password)
  if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta' })

  const token = generateToken(usuario)

  res.cookie('token', token, { httpOnly: true })

  return res.status(200).json({ usuario, token })
}