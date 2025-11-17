const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// ⚠️ IMPORTANT: Please try UNCOMMENTING ONLY ONE of these three options:

// OPTION 1 (The most common fix if your file is named 'auth.js')
// const { protect, permit } = require('../middleware/auth'); 

// OPTION 2 (If your middleware folder is at the same level as routes, this is often needed)
const { protect, permit } = require('../middleware/authMiddleware'); // <--- KEEP THIS ONE UNCOMMENTED FIRST

// OPTION 3 (If your routes folder is one level deeper than assumed)
// const { protect, permit } = require('../../middleware/authMiddleware'); 


// Assuming vendorController has the correct exports
const { registerVendor, loginVendor, listVendors } = require('../controllers/vendorController'); 


// @route   POST /api/vendors/register
router.post('/register',
    // Input validation checks
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('shopName').notEmpty().withMessage('Shop Name is required'),
    registerVendor
);

// @route   POST /api/vendors/login
router.post('/login', loginVendor);

// (The 'listVendors' route remains commented out to ensure server startup)
// router.get('/listVendors', protect, permit('admin'), listVendors); 


module.exports = router;
