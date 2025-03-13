import { Router } from 'express';
import { cartController } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, cartController.getCartByUser);
router.post('/create', authMiddleware, cartController.createCart);
router.post('/:cid/product/:pid', authMiddleware, cartController.addProductToCart);
router.post('/:cid/purchase', authMiddleware, cartController.purchaseCart);

export default router;
