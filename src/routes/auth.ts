import express from 'express'
import {
  registerUser,
  loginUser,
  getAllUsers
} from '../controllers/userController'

const router = express.Router()

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser)

// @route   POST /api/auth/login
// @desc    Log in a user
router.post('/login', loginUser)

// @route   GET /api/auth/users
// @desc    Get all users (admin/dev only for now)
router.get('/users', getAllUsers)

export default router
