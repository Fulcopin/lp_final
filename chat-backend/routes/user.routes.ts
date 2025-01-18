import { Router } from 'express';
import { searchUsers, sendFriendRequest } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);
router.get('/search', searchUsers);
router.post('/friends/request', sendFriendRequest);

export default router;