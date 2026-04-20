import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/lib/db/test-connection'

export async function GET() {
  try {
    const success = await testDatabaseConnection()
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Database connected successfully!',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Database connection failed',
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    )
  }
}