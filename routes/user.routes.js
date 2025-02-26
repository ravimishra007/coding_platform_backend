import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import express from 'express';


const router = express.Router();

router.post('/',  createUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken,  updateUser);
router.delete('/:id', authenticateToken,  deleteUser);

export default router;
