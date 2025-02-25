import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectDB } from "./config/db.js";
import passportConfig from "./config/passport.js"; // Importamos la configuración de Passport
import sessionsRoutes from "./routes/sessions.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/api/sessions", sessionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
