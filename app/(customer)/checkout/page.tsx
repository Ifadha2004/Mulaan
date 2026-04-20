'use client'

import { useState } from 'react'
import { useCart } from '@/lib/hooks/useCart'
import { MessageCircle, CheckCircle, RefreshCcw, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, subtotal, isEmpty, clearCart } = useCart()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (formData.fullName.trim().length < 3) newErrors.fullName = "Please enter your full name."
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 7 || phoneDigits.length > 15) newErrors.phone = "Please enter a valid contact number."
    if (formData.address.trim().length < 10) newErrors.address = "Please provide a more detailed address."
    if (!formData.city.trim()) newErrors.city = "City/Emirate is required."
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInitialWhatsAppClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const whatsappNumber = "94760100965"
    const itemsList = items.map(item => 
      `• ${item.name} (${item.variant.size}/${item.variant.color}) x${item.quantity} - AED ${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A')

    const message = `*NEW ORDER - MULAAN*%0A%0A` +
      `*Customer Details:*%0A` +
      `Name: ${formData.fullName.trim()}%0A` +
      `Phone: ${formData.phone.trim()}%0A` +
      `Address: ${formData.address.trim()}, ${formData.city.trim()}%0A%0A` +
      `*Order Summary:*%0A${itemsList}%0A%0A` +
      `*Total Amount: AED ${subtotal.toFixed(2)}*%0A%0A` +
      `*Notes:* ${formData.notes.trim() || 'None'}%0A%0A` +
      `_Please confirm my order and share payment details._`

    // Open WhatsApp in new tab
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    
    // Switch to confirmation mode
    setHasOpenedWhatsApp(true)
  }

  const handleFinalizeSuccess = () => {
    clearCart()
    router.push('/checkout/success')
  }

  if (isEmpty) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFAF7]">
      <p className="heading-luxury text-[10px] tracking-[0.3em] uppercase opacity-50 font-light text-brand-green">Your selection is empty</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-24 px-4">
      <div className="container-luxury max-w-4xl">
        <header className="mb-16 text-center space-y-4">
          <h1 className="heading-luxury text-3xl tracking-[0.3em] text-brand-green uppercase font-serif">
            Finalize Selection
          </h1>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
        </header>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left Column: Form / Steps */}
          <div className="space-y-10">
            <h2 className="heading-luxury text-[11px] tracking-[0.2em] text-brand-gold uppercase border-b border-brand-green/5 pb-2">
              Delivery Information
            </h2>
            
            {!hasOpenedWhatsApp ? (
              <form onSubmit={handleInitialWhatsAppClick} className="space-y-8 animate-in fade-in duration-500">
                <div className="space-y-8">
                  <div className="relative">
                    <input name="fullName" type="text" placeholder="FULL NAME" value={formData.fullName} onChange={handleInputChange} className={`w-full bg-transparent border-b ${errors.fullName ? 'border-red-300' : 'border-brand-green/10'} py-3 text-[11px] tracking-widest focus:border-brand-gold transition-colors outline-none uppercase font-light`} />
                    {errors.fullName && <p className="text-[9px] text-red-500 mt-1 tracking-wider uppercase font-medium">{errors.fullName}</p>}
                  </div>

                  <div className="relative">
                    <input name="phone" type="tel" placeholder="CONTACT NUMBER" value={formData.phone} onChange={handleInputChange} className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-300' : 'border-brand-green/10'} py-3 text-[11px] tracking-widest focus:border-brand-gold transition-colors outline-none uppercase font-light`} />
                    {errors.phone && <p className="text-[9px] text-red-500 mt-1 tracking-wider uppercase font-medium">{errors.phone}</p>}
                  </div>

                  <div className="relative">
                    <input name="address" type="text" placeholder="SHIPPING ADDRESS" value={formData.address} onChange={handleInputChange} className={`w-full bg-transparent border-b ${errors.address ? 'border-red-300' : 'border-brand-green/10'} py-3 text-[11px] tracking-widest focus:border-brand-gold transition-colors outline-none uppercase font-light`} />
                    {errors.address && <p className="text-[9px] text-red-500 mt-1 tracking-wider uppercase font-medium">{errors.address}</p>}
                  </div>

                  <div className="relative">
                    <input name="city" type="text" placeholder="CITY / EMIRATE" value={formData.city} onChange={handleInputChange} className={`w-full bg-transparent border-b ${errors.city ? 'border-red-300' : 'border-brand-green/10'} py-3 text-[11px] tracking-widest focus:border-brand-gold transition-colors outline-none uppercase font-light`} />
                    {errors.city && <p className="text-[9px] text-red-500 mt-1 tracking-wider uppercase font-medium">{errors.city}</p>}
                  </div>

                  <textarea name="notes" placeholder="ADDITIONAL NOTES (OPTIONAL)" value={formData.notes} onChange={handleInputChange} className="w-full bg-transparent border-b border-brand-green/10 py-3 text-[11px] tracking-widest focus:border-brand-gold transition-colors outline-none uppercase min-h-[80px] font-light" />
                </div>

                <button type="submit" className="w-full flex items-center justify-between bg-brand-green text-white px-8 py-5 text-[11px] tracking-[0.3em] uppercase group hover:bg-brand-green/90 transition-all shadow-xl">
                  Send Order via WhatsApp
                  <MessageCircle className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-brand-gold/5 p-8 border border-brand-gold/20 rounded-sm space-y-4">
                  <h3 className="heading-luxury text-[10px] tracking-[0.2em] text-brand-green uppercase font-bold">Verification Step</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed tracking-wide">
                    We have opened WhatsApp for you. Please click **'Send'** in the chat window, then return here to finalize your order.
                  </p>
                </div>

                <button 
                  onClick={handleFinalizeSuccess}
                  className="w-full flex items-center justify-between bg-brand-gold text-brand-green px-8 py-5 text-[11px] tracking-[0.3em] uppercase font-bold shadow-xl hover:bg-brand-gold/90 transition-all border border-brand-gold"
                >
                  I have sent the message
                  <CheckCircle className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => setHasOpenedWhatsApp(false)}
                  className="w-full flex items-center justify-center gap-2 text-[9px] tracking-widest text-gray-400 uppercase hover:text-brand-green transition-colors py-2"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Edit Order Details
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="bg-white p-10 border border-brand-green/5 h-fit shadow-[0_20px_50px_rgba(20,38,34,0.03)] sticky top-24">
            <h2 className="heading-luxury text-[11px] tracking-[0.2em] text-brand-green uppercase mb-8 border-b border-brand-green/5 pb-4">
              Your Selection
            </h2>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.variant.sku} className="flex justify-between items-start text-[10px] tracking-widest uppercase leading-loose">
                  <div className="flex-1 pr-4">
                    <span className="text-brand-green block mb-1">{item.name}</span>
                    <span className="text-gray-400 block text-[9px] font-light">{item.variant.size} • {item.variant.color} • QTY: {item.quantity}</span>
                  </div>
                  <span className="text-brand-green font-medium">AED {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-brand-green/5 flex justify-between items-baseline">
              <span className="heading-luxury text-[10px] tracking-[0.4em] uppercase text-gray-400 font-light">Total</span>
              <span className="text-2xl tracking-[0.1em] text-brand-green font-medium">AED {subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}