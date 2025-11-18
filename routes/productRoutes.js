import express from 'express';
import { createProduct, getProducts, getProductById, deleteProduct } from '../controllers/productController.js';
import { protect, vendor, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Get product by id
router.get('/:id', getProductById);

// Create product (vendor only)
router.post('/', protect, vendor, createProduct);

// Delete product (vendor or admin)
router.delete('/:id', protect, deleteProduct);

export default router;
