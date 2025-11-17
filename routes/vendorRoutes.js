const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import middleware
const { protect, permit } = require('../middlewares/authMiddleware');

// Import controller functions
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController');

// Vendor registration route
router.post(
  '/register',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('shopName').notEmpty().withMessage('Shop Name is required'),
  registerVendor
);

// Vendor login route
router.post('/login', loginVendor);

// List vendors (admin only) - uncomment when admin role is ready
// router.get('/listVendors', protect, permit('admin'), listVendors);

module.exports = router;
