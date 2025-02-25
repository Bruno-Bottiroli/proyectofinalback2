import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../dao/models/user.js";
import { comparePassword } from "../utils/bcrypt.js";
import dotenv from "dotenv";

dotenv.config();

// Estrategia Local (Login con email y contraseña)
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (!user) return done(null, false, { message: "Usuario no encontrado" });

        const isMatch = comparePassword(password, user.password);
        if (!isMatch) return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estrategia JWT (Para verificar sesión)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.token, // Extraer de la cookie
      ]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await userModel.findById(jwt_payload.id);
        if (!user) return done(null, false, { message: "Token inválido" });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
