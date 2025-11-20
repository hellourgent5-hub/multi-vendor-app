// routes/vendorRoutes.js (TEMPORARY TEST CODE)
import express from 'express';
const router = express.Router();

router.post("/register", (req, res) => {
    // This is a simple test response that requires no logic or dependencies
    res.status(200).json({ success: true, message: "Vendor Route Test Succeeded!" });
});

// Remove or comment out any other code, like router.post("/login", ...)

export default router;
