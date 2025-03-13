import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import cartRoutes from './routes/cart.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import passport from 'passport';
import './config/passport.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(passport.initialize());
// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/products', productRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`servidor corriendo en el puerto ${PORT}`));
