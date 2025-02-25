import express from "express";
import passport from "passport";
import { userModel } from "../dao/models/user.js";
import { hashPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { UserDTO } from "../dto/userDTO.js";

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const userExist = await userModel.findOne({ email });

    if (userExist) return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = hashPassword(password);
    const newUser = new userModel({ first_name, last_name, email, age, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

// Login con Passport Local
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true }).json({ message: "Inicio de sesión exitoso", token });
  })(req, res, next);
});

// Ruta `/current` protegida con JWT, devolviendo solo datos esenciales
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  const userDTO = new UserDTO(req.user); // Aplicamos el DTO
  res.json(userDTO);
});

// Cerrar sesión
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Sesión cerrada con éxito" });
});

export default router;
