const Product = require('../models/Product');

// Create product
const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  const product = await Product.create({
    vendor: req.user.id,
    name, description, price, stock, category
  });
  res.json(product);
};

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find().populate('vendor','shopName');
  res.json(products);
};

module.exports = { createProduct, getProducts };

