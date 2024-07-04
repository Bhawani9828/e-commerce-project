import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongodb'

export async function GET() {
  const client = await clientPromise
  const db = client.db("nextproject")
  const products = await db.collection("products").find({}).toArray()
  return NextResponse.json(products)
}


export async function POST(request: NextRequest) {
    try {
      const client = await clientPromise
      const db = client.db("nextproject")
      
      // Request body se data nikalen
      const body = await request.json()
      
      // Data ko database mein add karen
      const result = await db.collection("products").insertOne(body)
      
      // Response bhejein
      return NextResponse.json({ message: "Product added successfully", productId: result.insertedId }, { status: 201 })
    } catch (error) {
      console.error("Error adding product:", error)
      return NextResponse.json({ error: "Error adding product" }, { status: 500 })
    }
  }