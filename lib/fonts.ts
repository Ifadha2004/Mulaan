// lib/fonts.ts
import localFont from 'next/font/local'

export const blosta = localFont({
  src: [
    {
      path: '../public/fonts/blosta/Blosta-Regular.woff2',
      weight: '100',
      style: 'normal',
    },
    // If you have a bold weight file too, uncomment and point to it:
    // {
    //   path: '../public/fonts/blosta/Blosta-Bold.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-blosta',
  display: 'swap',
})