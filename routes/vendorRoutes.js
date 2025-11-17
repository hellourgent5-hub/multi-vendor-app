const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// ⚠️ IMPORTANT: YOU MUST CORRECT THIS PATH!
// If your authMiddleware is in a folder named 'middleware' in the root, 
// the path is likely correct. If not, change the path here.
// Example: If it's in a file named 'auth.js' in the 'middleware' folder:
// const { protect, permit } = require('../middleware/auth');
const { protect, permit } = require('../middleware/authMiddleware'); 

// Assuming vendorController has the correct exports
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController'); 


// @route   POST /api/vendors/register
// @desc    Register a new vendor
// @access  Public
router.post('/register',
    // Input validation checks
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('shopName').notEmpty().withMessage('Shop Name is required'),
    registerVendor
);

// @route   POST /api/vendors/login
// @desc    Authenticate vendor & get token
// @access  Public
router.post('/login', loginVendor);

// NOTE: This route is still commented out until the server starts successfully.
// router.get('/listVendors', protect, permit('admin'), listVendors); 


module.exports = router;
