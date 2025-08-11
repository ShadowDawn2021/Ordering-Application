import express from "express";

import { addProduct, getProducts } from "../controllers/productController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/add", userAuth, addProduct);
router.get("/products", userAuth, getProducts);

export default router;
