import express from "express";
import * as authController from "../controller/auth.controller";

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/logout", authController.logOut);

export default router;
