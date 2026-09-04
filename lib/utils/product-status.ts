export type CalculatedStatus = 'COMING_SOON' | 'PRE_ORDER_OPEN' | 'PRE_ORDER_CLOSED' | 'SOLD_OUT' | 'ACTIVE'

export const getCampaignStatus = (product: any): CalculatedStatus => {
  const now = new Date()

  if (product.status === 'sold_out') return 'SOLD_OUT'

  // Real schema stores flat preOrderStart / preOrderEnd fields, not a nested object
  if (product.isPreOrder && product.preOrderStart && product.preOrderEnd) {
    const start = new Date(product.preOrderStart)
    const end = new Date(product.preOrderEnd)

    if (now < start) return 'COMING_SOON'
    if (now >= start && now <= end) return 'PRE_ORDER_OPEN'
    if (now > end) return 'PRE_ORDER_CLOSED'
  }

  return product.status === 'pre_order' ? 'PRE_ORDER_OPEN' : 'ACTIVE'
}