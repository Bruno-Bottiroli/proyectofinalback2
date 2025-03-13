import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'
import cartRoutes from './routes/cart.routes.js'
import productRoutes from './routes/product.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();


connectDB()

app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api/users', userRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))