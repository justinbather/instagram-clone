import express from 'express';
import { CreatePost, FetchProfile, FollowUser, HomeFeed, UpdateProfile, fetchFollowing, unfollowUser } from '../../controllers/UserController.js';
import { userVerification } from '../../middlewares/AuthMiddleware.js';
import upload from '../../middlewares/FileUploadMiddleware.js';



const router = express.Router();



//router.get('/home', userVerification, FetchUserFeed);
router.post('/create', userVerification, upload.single('image') , CreatePost);
router.get('/profile/:username?', userVerification, FetchProfile);
router.get('/profile/:username?/followers', userVerification, );
router.get('/profile/:username?/following', userVerification, fetchFollowing)
router.post('/follow/:username', userVerification, FollowUser);
router.post('/unfollow/:username', userVerification, unfollowUser);
router.put('/profile', userVerification, upload.single('image'), UpdateProfile);

export default router;
