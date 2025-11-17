const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const DeliveryAgent = require('../models/DeliveryAgent');

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Customer register
const registerUser = async (req, res) => {
  const { name, email, password, location } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password, location });
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id, user.role) });
};

// Customer login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    return res.json({ id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id, user.role) });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

// Vendor register/login
const registerVendor = async (req, res) => {
  const { name, email, password, shopName, location } = req.body;
  const exists = await Vendor.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Vendor already exists' });
  const vendor = await Vendor.create({ name, email, password, shopName, location });
  res.status(201).json({ id: vendor._id, name: vendor.name, email: vendor.email, shopName: vendor.shopName, role: vendor.role, token: generateToken(vendor._id, vendor.role) });
};

const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (vendor && await vendor.matchPassword(password)) {
    return res.json({ id: vendor._id, name: vendor.name, email: vendor.email, shopName: vendor.shopName, role: vendor.role, token: generateToken(vendor._id, vendor.role) });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

// Delivery agent register/login
const registerAgent = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const exists = await DeliveryAgent.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Agent exists' });
  const agent = await DeliveryAgent.create({ name, email, password, phone });
  res.status(201).json({ id: agent._id, name: agent.name, token: generateToken(agent._id, agent.role) });
};

const loginAgent = async (req, res) => {
  const { email, password } = req.body;
  const agent = await DeliveryAgent.findOne({ email });
  if (agent && await agent.matchPassword(password)) {
    return res.json({ id: agent._id, name: agent.name, role: agent.role, token: generateToken(agent._id, agent.role) });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { registerUser, loginUser, registerVendor, loginVendor, registerAgent, loginAgent };
