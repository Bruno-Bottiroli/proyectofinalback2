import express from 'express';
import User from '../models/user.model.js'; // Importa el modelo User correctamente
import { registrarUsuario, obtenerUsuarioPorEmail } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const { usuario, nuevoCarrito } = await registrarUsuario(nombre, email, password);
    res.status(201).json({ usuario, nuevoCarrito });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;