// 'use client'

// import { useCart } from '@/lib/hooks/useCart'
// import { IProduct, IProductVariant } from '@/lib/db/models'

// export default function TestCartPage() {
//   const { items, itemCount, subtotal, addToCart, removeItem, updateQuantity, clearCart } = useCart()

//   // Mock product for testing
//   const mockProduct: Partial<IProduct> = {
//     _id: '123' as any,
//     name: 'Elegant Abaya',
//     slug: 'elegant-abaya',
//     price: 299,
//     images: [{ url: '/placeholder.jpg', alt: 'Abaya', order: 1 }],
//     status: 'active',
//   }

//   const mockVariant: IProductVariant = {
//     size: 'M',
//     color: 'Black',
//     sku: 'EAB-M-BLK-001',
//     stock: 10,
//   }

//   const handleAddToCart = () => {
//     addToCart(mockProduct as IProduct, mockVariant, 1)
//   }

//   return (
//     <div className="container-luxury py-12">
//       <h1 className="heading-luxury text-4xl mb-8">Cart System Test</h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Test Product */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-2xl font-semibold mb-4">Mock Product</h2>
//           <div className="space-y-3">
//             <p><strong>Name:</strong> {mockProduct.name}</p>
//             <p><strong>Price:</strong> AED {mockProduct.price}</p>
//             <p><strong>Size:</strong> {mockVariant.size}</p>
//             <p><strong>Color:</strong> {mockVariant.color}</p>
//             <p><strong>Stock:</strong> {mockVariant.stock}</p>
//           </div>
//           <button 
//             onClick={handleAddToCart}
//             className="btn-primary mt-6 w-full"
//           >
//             Add to Cart
//           </button>
//         </div>

//         {/* Cart Display */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold">Cart ({itemCount})</h2>
//             {items.length > 0 && (
//               <button 
//                 onClick={clearCart}
//                 className="text-red-600 text-sm hover:underline"
//               >
//                 Clear Cart
//               </button>
//             )}
//           </div>

//           {items.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">Your cart is empty</p>
//           ) : (
//             <div className="space-y-4">
//               {items.map((item) => (
//                 <div 
//                   key={`${item.productId}-${item.variant.sku}`}
//                   className="border-b pb-4"
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <h3 className="font-medium">{item.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         {item.variant.size} - {item.variant.color}
//                       </p>
//                       <p className="text-sm font-medium" style={{ color: 'var(--brand-green)' }}>
//                         AED {item.price}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => removeItem(item.productId, item.variant.sku)}
//                       className="text-red-600 text-sm hover:underline"
//                     >
//                       Remove
//                     </button>
//                   </div>
                  
//                   {/* Quantity Controls */}
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity - 1)}
//                       className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
//                     >
//                       -
//                     </button>
//                     <span className="w-12 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity + 1)}
//                       className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
//                     >
//                       +
//                     </button>
//                     <span className="ml-auto font-medium">
//                       AED {(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               ))}

//               {/* Totals */}
//               <div className="pt-4 space-y-2">
//                 <div className="flex justify-between text-lg font-semibold">
//                   <span>Subtotal:</span>
//                   <span style={{ color: 'var(--brand-green)' }}>AED {subtotal.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button className="btn-gold w-full mt-4">
//                 Proceed to Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Cart State (for debugging) */}
//       <div className="mt-8 bg-gray-100 p-6 rounded-lg">
//         <h3 className="font-semibold mb-2">Cart State (Debug)</h3>
//         <pre className="text-xs overflow-auto">
//           {JSON.stringify({ items, itemCount, subtotal }, null, 2)}
//         </pre>
//       </div>
//     </div>
//   )
// }


'use client'

import { useCart } from '@/lib/hooks/useCart'
import { IProduct, IProductVariant } from '@/lib/db/models'

export default function TestCartPage() {
  const { items, itemCount, subtotal, addToCart, removeItem, updateQuantity, clearCart } = useCart()

  // Mock product for testing
  const mockProduct: Partial<IProduct> = {
    _id: '123' as any,
    name: 'Elegant Abaya',
    slug: 'elegant-abaya',
    price: 299,
    images: [{ url: '/placeholder.jpg', alt: 'Abaya', order: 1 }],
    status: 'active',
  }

  const mockVariant: IProductVariant = {
    size: 'M',
    color: 'Black',
    sku: 'EAB-M-BLK-001',
    stock: 10,
  }

  const handleAddToCart = () => {
    addToCart(mockProduct as IProduct, mockVariant, 1)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-cream)' }}>
      <div className="container-luxury py-16">
        <h1 className="heading-luxury text-5xl mb-12 text-center">Cart System Test</h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Test Product Card */}
          <div className="card-luxury p-8">
            <div className="mb-6">
              <span className="badge-new inline-block mb-4">Test Product</span>
              <h2 className="heading-luxury text-3xl mb-6">{mockProduct.name}</h2>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b" style={{ borderColor: 'var(--brand-gold)' }}>
                <span className="text-gray-600">Price</span>
                <span className="font-semibold" style={{ color: 'var(--brand-green)' }}>
                  AED {mockProduct.price}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Size</span>
                <span className="font-medium">{mockVariant.size}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Color</span>
                <span className="font-medium">{mockVariant.color}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Stock Available</span>
                <span className="font-medium text-green-600">{mockVariant.stock} pieces</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="btn-primary w-full"
            >
              Add to Cart
            </button>
          </div>

          {/* Cart Card */}
          <div className="card-luxury p-8">
            <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: '2px solid var(--brand-gold)' }}>
              <h2 className="heading-luxury text-3xl">Your Cart</h2>
              <div className="flex items-center gap-4">
                <span className="badge-pre-order">{itemCount} items</span>
                {items.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-sm hover:underline"
                    style={{ color: 'var(--brand-green)' }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16">
                <svg 
                  className="w-24 h-24 mx-auto mb-4 opacity-20" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--brand-green)' }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                  />
                </svg>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add items to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div 
                    key={`${item.productId}-${item.variant.sku}`}
                    className="border-b pb-6"
                    style={{ borderColor: 'rgba(201, 184, 150, 0.3)' }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--brand-green)' }}>
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Size: {item.variant.size} • Color: {item.variant.color}
                        </p>
                        <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>
                          AED {item.price} each
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.variant.sku)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium ml-4"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center border-2 hover:bg-gray-50 transition-colors"
                          style={{ borderColor: 'var(--brand-green)' }}
                        >
                          <span style={{ color: 'var(--brand-green)' }}>−</span>
                        </button>
                        <span className="w-16 text-center font-semibold text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant.sku, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center border-2 hover:bg-gray-50 transition-colors"
                          style={{ borderColor: 'var(--brand-green)' }}
                        >
                          <span style={{ color: 'var(--brand-green)' }}>+</span>
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                        <p className="text-xl font-bold" style={{ color: 'var(--brand-green)' }}>
                          AED {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cart Totals */}
                <div className="pt-6 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">AED {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div 
                    className="h-px my-4" 
                    style={{ background: 'linear-gradient(to right, transparent, var(--brand-gold), transparent)' }}
                  />
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold" style={{ color: 'var(--brand-green)' }}>
                      AED {subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="btn-gold w-full mt-6 text-base py-4">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Debug Section */}
        <div className="mt-12 max-w-6xl mx-auto">
          <details className="bg-white p-6 rounded-lg shadow">
            <summary className="cursor-pointer font-semibold mb-4" style={{ color: 'var(--brand-green)' }}>
              Cart State (Debug Info)
            </summary>
            <pre className="text-xs overflow-auto p-4 bg-gray-50 rounded">
              {JSON.stringify({ items, itemCount, subtotal }, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  )
}