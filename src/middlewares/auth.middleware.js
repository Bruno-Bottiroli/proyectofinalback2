import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  let token

  const authHeader = req.header('Authorization')
  if (authHeader) {
    token = authHeader.replace('Bearer ', '')
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token no válido.' })
  }
};