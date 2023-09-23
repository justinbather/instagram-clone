import express from 'express';
import { CreatePost, FetchProfile, FollowUser, HomeFeed, UpdateProfile, fetchFollowing } from '../../controllers/UserController.js';
import { userVerification } from '../../middlewares/AuthMiddleware.js';
import upload from '../../middlewares/FileUploadMiddleware.js';
import { FetchUserFeed } from '../../controllers/FeedController.js';


const router = express.Router();



router.get('/home', userVerification, FetchUserFeed);
router.post('/create', userVerification, upload.single('image') , CreatePost);
router.get('/profile', userVerification, FetchProfile);
router.get('/profile/followers', userVerification, );
router.get('/profile/following', userVerification, fetchFollowing)
router.post('/follow', userVerification, FollowUser);
router.put('/profile', userVerification, upload.single('image'), UpdateProfile);

export default router;
