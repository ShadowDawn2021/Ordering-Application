import express from "express";
import {
  login,
  logout,
  register,
  isAuthenticated,
  updateProfile,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/isAuth", userAuth, isAuthenticated);
router.put("/update", userAuth, updateProfile);

export default router;
