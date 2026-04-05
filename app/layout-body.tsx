'use client'

import { ReactNode } from 'react'
import Header from '@/components/Global/Header/Header'
import Footer from '@/components/Global/Footer/Footer'
import LenisScrollProvider from '@/providers/lenis-providers'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function LayoutBody({ children }: { children: ReactNode }) {
  return (
      <body>
      <Header />
      <LenisScrollProvider>
        {children}
        <SpeedInsights />
        <Analytics />
      </LenisScrollProvider>
      <Footer />
      </body>
  )
}
