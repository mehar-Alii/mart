import { Router } from "express";
import { registerUser , testRequest , loginUser} from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.post("/test/:id", testRequest);
router.route("/login").post(loginUser)

export default router