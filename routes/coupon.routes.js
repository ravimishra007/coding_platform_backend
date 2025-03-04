import { createCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon } from '../controllers/coupon.controller.js';
// import { authenticateToken } from '../middleware/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/', createCoupon);
router.get('/',  getAllCoupons);
router.get('/:id',  getCouponById);
router.put('/:id', updateCoupon);
router.delete('/:id',  deleteCoupon);

export default router;
