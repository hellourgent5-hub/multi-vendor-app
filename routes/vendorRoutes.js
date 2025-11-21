import express from "express";
import { 
    getVendors,
    getVendor,
    createVendor,
    updateVendor,
    deleteVendor, // Line 7 - This must be exported by the controller
    approveVendor 
} from '../controllers/vendorController.js'; 

const router = express.Router();

router.post("/", createVendor);
router.get("/", getVendors);
router.get("/:id", getVendor);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);
router.put("/approve/:id", approveVendor); // Assuming you use this route

export default router;
