// src/index.ts
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import cors from 'cors'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors()) // allow requests from frontend

import productRoutes from './routes/product'

app.use('/api/products', productRoutes)

// API routes
app.use('/api/auth', authRoutes)

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI as string

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err)
  })
