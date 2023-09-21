import express from 'express';
import { CreatePost, FetchProfile, FollowUser, HomeFeed } from '../../controllers/UserController.js';
import { userVerification } from '../../middlewares/AuthMiddleware.js';
import upload from '../../middlewares/FileUploadMiddleware.js';


const router = express.Router();



router.get('/home', userVerification, HomeFeed);
router.post('/create', userVerification, upload.single('image') , CreatePost);
router.get('/profile', userVerification, FetchProfile);
router.post('/follow', userVerification, FollowUser);
router.put('/profile');

export default router;
