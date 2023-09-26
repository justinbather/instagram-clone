import express from 'express';
import { userVerification } from '../../middlewares/AuthMiddleware.js';
import { FetchUserFeed, likePost, unlikePost } from '../../controllers/FeedController.js';


const router = express.Router();

router.get('/', userVerification, FetchUserFeed)
router.post('/like', userVerification, likePost)
router.post('/unlike', userVerification, unlikePost)




export default router;
