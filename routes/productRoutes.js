import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
} from "../controllers/productController.js";

const router = express.Router();

// CREATE PRODUCT
router.post("/", createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET ONE PRODUCT
router.get("/:id", getProduct);

export default router;
