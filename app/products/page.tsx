'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('http://localhost:3000/api/products')
                if (!res.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await res.json()
                console.log('API Response:', data)
                setProducts(data)
            } catch (err) {
                console.error('Error fetching products:', err)
                setError('Error loading products. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (products.length === 0) return <p>No products found.</p>

    return (
        <section className='h-full w-full'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link href={`/products/${product._id}`} key={product._id} className="border p-4 rounded">
                <h2 className="text-xl text-orange-600 font-bold">{product.name}</h2>
                <p>${product.price}</p>
                <p>{product.description}</p>
              </Link>
            ))}
          </div>
        </section>
    )
}