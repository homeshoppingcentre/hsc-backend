"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // allow requests from frontend
const product_1 = __importDefault(require("./routes/product"));
app.use('/api/products', product_1.default);
// API routes
app.use('/api/auth', auth_1.default);
// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
});
