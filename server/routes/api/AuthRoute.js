import {Signup, Login} from "../../controllers/AuthController.js";
import { userVerification } from "../../middlewares/AuthMiddleware.js";

import express from "express";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.redirect('/')
})
router.post('/home', userVerification);

export default router;