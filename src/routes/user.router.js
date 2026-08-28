import { Router } from "express";
import { registerUser , testRequest } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.post("/test/:id", testRequest);

export default router