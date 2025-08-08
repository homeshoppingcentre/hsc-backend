import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()

// Middleware to parse JSON
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

// MongoDB connection
const mongoURI = process.env.MONGO_URI as string

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err)
  })
