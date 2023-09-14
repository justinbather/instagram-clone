import {Signup, Login} from "../../controllers/AuthController.js";

import express from "express";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login)

export default router;