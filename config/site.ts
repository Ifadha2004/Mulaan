export const siteConfig = {
  name: 'Mulaan',
  description: 'Modest wear for the modern woman. Limited pieces, timeless elegance.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/mulaan.lk',
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971XXXXXXXXX',
}

export type SiteConfig = typeof siteConfig