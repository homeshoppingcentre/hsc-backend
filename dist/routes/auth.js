"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', userController_1.registerUser);
// @route   POST /api/auth/login
// @desc    Log in a user
router.post('/login', userController_1.loginUser);
// @route   GET /api/auth/users
// @desc    Get all users (admin/dev only for now)
router.get('/users', userController_1.getAllUsers);
exports.default = router;
