import express from 'express';
import { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan } from '../controllers/plan.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/',  createPlan);
router.get('/', authenticateToken, getAllPlans);
router.get('/:id', authenticateToken, getPlanById);
router.put('/:id', authenticateToken,  updatePlan);
router.delete('/:id', authenticateToken, deletePlan);

export default router;
