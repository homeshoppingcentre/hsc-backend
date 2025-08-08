"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
// Create new product
const createProduct = async (req, res) => {
    const { title, description, price, image, userId } = req.body;
    try {
        const newProduct = new product_1.default({ title, description, price, image, userId });
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating product' });
    }
};
exports.createProduct = createProduct;
// Get products by user
const getUserProducts = async (req, res) => {
    const { userId } = req.params;
    try {
        const products = await product_1.default.find({ userId });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};
exports.getUserProducts = getUserProducts;
