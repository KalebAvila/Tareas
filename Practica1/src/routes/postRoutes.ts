import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createPost);
router.get('/', getPosts);

export default router;