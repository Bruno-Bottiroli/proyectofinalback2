import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User  from '../models/user.model.js'; // Asegúrate de que 'User' esté importado correctamente
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de cargar las variables de entorno

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Aquí usas el secreto de las variables de entorno
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) return done(null, false); // Si no se encuentra el usuario
      done(null, user); // Si se encuentra el usuario
    } catch (error) {
      done(error, false); // Manejo de errores
    }
  })
);
