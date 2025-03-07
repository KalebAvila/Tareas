import { Router } from 'express';
import { login, perfil } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/perfil', authMiddleware, perfil);

export default router;