import express from 'express'
import { productController } from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/', productController.addProduct)
router.get('/', productController.getAllProducts)
export default router