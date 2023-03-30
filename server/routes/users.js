import express from "express";

import { SignIn , SignUp } from "../controllers/users.js";

const router = express.Router();

router.post('/signin', SignIn)

router.post('/signup',SignUp)


export default router 