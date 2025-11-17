const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createProduct);  // Only logged-in vendor
router.get('/', getProducts);               // Public

module.exports = router;

