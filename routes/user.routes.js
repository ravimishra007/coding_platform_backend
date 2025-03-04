import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import express from 'express';


const router = express.Router();

router.post('/',  createUser);
router.get('/', getAllUsers); 
router.get('/:id',  getUserById);
router.put('/:id',   updateUser);
router.delete('/:id',   deleteUser);

export default router;
