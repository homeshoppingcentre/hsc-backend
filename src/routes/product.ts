import express from 'express'
import { createProduct, getUserProducts } from '../controllers/productController'

const router = express.Router()

router.post('/', createProduct)
router.get('/:userId', getUserProducts)

export default router
