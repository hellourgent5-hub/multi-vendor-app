import Product from '../models/Product.js';
import Vendor from '../models/Vendor.js';

// Create product (Vendor only)
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, images, category } = req.body;
        const vendor = await Vendor.findOne({ user: req.user.id });
        if (!vendor) return res.status(400).json({ message: 'Vendor profile not found' });

        const product = await Product.create({
            vendor: vendor._id,
            name,
            description,
            price,
            stock,
            images,
            category
        });

        vendor.products.push(product._id);
        await vendor.save();

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('vendor', 'shopName');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('vendor', 'shopName');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete product (Vendor or Admin)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.remove();
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
