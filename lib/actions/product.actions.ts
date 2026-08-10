'use server'

import { connectDB } from '@/lib/db/mongodb'
import Product from '@/lib/db/models/Product'

export async function getProductBySlug(slug: string) {
  try {
    await connectDB()
    
    // Find the product and convert from Mongoose Document to plain JS Object
    const product = await Product.findOne({ slug }).lean()
    
    if (!product) return null

    // Crucial: MongoDB _ids and Dates must be stringified for Next.js Client Components
    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}