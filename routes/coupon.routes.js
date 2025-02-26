import { createCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon } from '../controllers/coupon.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/', createCoupon);
router.get('/', authenticateToken, getAllCoupons);
router.get('/:id', authenticateToken, getCouponById);
router.put('/:id', authenticateToken, updateCoupon);
router.delete('/:id', authenticateToken, deleteCoupon);

export default router;
