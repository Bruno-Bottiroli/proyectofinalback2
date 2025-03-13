import passport from 'passport';
import jwt from 'jsonwebtoken';
export const protegerRuta = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, usuario) => {
    if (err || !usuario) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }
    req.usuario = usuario;
    next();
  })(req, res, next);
};



export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No se proporciona token de autenticación.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = decoded; // Aquí colocamos la información del usuario decodificada
    next();
  });
};
