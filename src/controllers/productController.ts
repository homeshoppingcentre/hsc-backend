import Product from '../models/product'
import { Request, Response } from 'express'

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, image, userId } = req.body

  try {
    const newProduct = new Product({ title, description, price, image, userId })
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' })
  }
}

// Get products by user
export const getUserProducts = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const products = await Product.find({ userId })
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' })
  }
}
