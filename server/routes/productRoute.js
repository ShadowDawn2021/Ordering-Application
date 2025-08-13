import express from "express";

import {
  addProduct,
  deleteProducts,
  editProduct,
  getProducts,
} from "../controllers/productController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/add", userAuth, addProduct);
router.get("/products", getProducts);
router.delete("/delete/:id", userAuth, deleteProducts);
router.put("/editProducts/:id", editProduct);

export default router;
