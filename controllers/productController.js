import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";
import Module from "../models/Module.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { vendorId, moduleId, categoryId, subcategoryId, name, price, description, stock, images } = req.body;

    // Validate vendor
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(400).json({ message: "Vendor not found" });

    // Validate module
    const module = await Module.findById(moduleId);
    if (!module) return res.status(400).json({ message: "Module not found" });

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ message: "Category not found" });

    // Validate subcategory
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) return res.status(400).json({ message: "Subcategory not found" });

    const product = new Product({
      vendor: vendorId,
      module: moduleId,
      category: categoryId,
      subcategory: subcategoryId,
      name,
      price,
      description,
      stock,
      images
    });

    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendor")
      .populate("module")
      .populate("category")
      .populate("subcategory");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vendor")
      .populate("module")
      .populate("category")
      .populate("subcategory");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
