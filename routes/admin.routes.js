import express from 'express';
import { registerAdmin, loginAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, forgotPassword, resetPassword } from '../controllers/admin.controller.js';
// import { authenticateToken } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register',registerAdmin);
router.post('/login', loginAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.delete('/:id', deleteAdmin);



export default router;
