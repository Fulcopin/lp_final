import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);
router.post('/send', sendMessage);
router.get('/', getMessages);

export default router;