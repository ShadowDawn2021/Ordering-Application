import express from "express";

import {
  addProduct,
  deleteProducts,
  getProducts,
} from "../controllers/productController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/add", userAuth, addProduct);
router.get("/products", userAuth, getProducts);
router.delete("/delete/:id", userAuth, deleteProducts);

export default router;
