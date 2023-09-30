import express from 'express';
import { userVerification } from '../../middlewares/AuthMiddleware.js';
import { Search } from '../../controllers/SearchController.js';

const router = express.Router();

router.post('/', userVerification, Search)

export default router;