export interface SalePricingProduct {
  price: number
  isOnSale?: boolean
  salePrice?: number | null
  saleLabel?: string | null
  saleStart?: string | Date | null
  saleEnd?: string | Date | null
}

function parseDate(value?: string | Date | null) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function isSaleActive(product: SalePricingProduct, now = new Date()) {
  if (!product.isOnSale) return false

  const regularPrice = Number(product.price)
  const salePrice = Number(product.salePrice)

  if (!Number.isFinite(regularPrice) || !Number.isFinite(salePrice)) return false
  if (salePrice <= 0 || salePrice >= regularPrice) return false

  const startsAt = parseDate(product.saleStart)
  const endsAt = parseDate(product.saleEnd)

  if (startsAt && now < startsAt) return false
  if (endsAt && now > endsAt) return false

  return true
}

export function getProductPricing(product: SalePricingProduct, now = new Date()) {
  const regularPrice = Number(product.price)
  const active = isSaleActive(product, now)
  const currentPrice = active ? Number(product.salePrice) : regularPrice

  return {
    regularPrice,
    currentPrice,
    isOnSale: active,
    saleLabel: product.saleLabel?.trim() || 'Sale',
    discountPercent: active
      ? Math.round(((regularPrice - currentPrice) / regularPrice) * 100)
      : 0,
  }
}
