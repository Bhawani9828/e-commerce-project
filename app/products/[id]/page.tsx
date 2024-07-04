async function getProduct(id: string) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' })
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Product not found')
      }
      throw new Error('Failed to fetch product')
    }
    return res.json()
  }
  
  export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    try {
      const product = await getProduct(params.id)
  
      return (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl text-blue-600 font-bold mb-4">{product.name}</h1>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
          <p className="text-xl mb-2">${product.price}</p>
          <p>{product.description}</p>
        </div>
      )
    } catch (error) {
      console.error('Error:', error)
      return <div>Error: {(error as Error).message}</div>
    }
  }