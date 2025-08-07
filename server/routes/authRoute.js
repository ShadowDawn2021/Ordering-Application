import express from "express";
import {
  login,
  logout,
  register,
  isAuthenticated,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/isAuth", userAuth, isAuthenticated);

export default router;
