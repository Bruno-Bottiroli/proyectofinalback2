import express from 'express'
import { cartController } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', cartController.getCartByUser)
router.post('/:cid/products/:pid', cartController.addProductToCart)
router.delete('/:cid/products/:pid', cartController.removeProductFromCart)
router.post('/:cid/purchase', cartController.purchaseCart)

export default router