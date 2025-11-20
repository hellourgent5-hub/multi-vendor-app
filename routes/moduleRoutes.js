import express from "express";
import Module from "../models/Module.js";

const router = express.Router();

// Get all modules
router.get("/", async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create module
router.post("/", async (req, res) => {
  try {
    const module = new Module({ name: req.body.name });
    await module.save();
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
