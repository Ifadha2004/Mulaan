import { connectDB } from './mongodb'
import { Product, Collection, User } from './models'

export async function testDatabaseConnection() {
  try {
    console.log('🔄 Testing database connection...')
    
    await connectDB()
    console.log('✅ Connected to MongoDB successfully!')
    
    // Test collections
    const productCount = await Product.countDocuments()
    const collectionCount = await Collection.countDocuments()
    const userCount = await User.countDocuments()
    
    console.log('📊 Database Stats:')
    console.log(`   Products: ${productCount}`)
    console.log(`   Collections: ${collectionCount}`)
    console.log(`   Users: ${userCount}`)
    
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}