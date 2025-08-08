import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
}

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    return res.status(200).json({ token })
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
}

// Get all users (admin)
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password')
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
}
