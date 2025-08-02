import express from "express";
import { login, logout, register } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);

export default router;
