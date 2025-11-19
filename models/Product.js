import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },

    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },

    // Add images array
    images: [String],

    // Add these two new fields
    category: { type: String, required: true },
    subcategory: { type: String },

    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: Number,
            comment: String
        }
    ]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
