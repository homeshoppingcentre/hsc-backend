"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.registerUser = registerUser;
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.loginUser = loginUser;
// Get all users (admin)
const getAllUsers = async (_req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllUsers = getAllUsers;
