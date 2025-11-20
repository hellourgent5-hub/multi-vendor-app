import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    // Basic Information
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // Vendor Specifics
    shopName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    // Authentication/Status
    isApproved: {
        type: Boolean,
        default: false // Requires admin approval before selling
    }
}, {
    timestamps: true
});

// NOTE: You would typically use middleware here to hash the password
// before saving the document (e.g., using bcrypt).

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
