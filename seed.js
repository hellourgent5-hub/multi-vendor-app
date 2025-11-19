import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB connected");

  await Category.deleteMany(); // clear old
  await Category.insertMany([
    { name: "Electronics", subcategories: ["Mobile Phones", "Laptops", "Cameras"] },
    { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
    { name: "Home & Kitchen", subcategories: ["Furniture", "Decor", "Appliances"] },
    { name: "Sports", subcategories: ["Fitness", "Outdoor", "Indoor Games"] },
  ]);

  console.log("Seed completed");
  process.exit();
});
