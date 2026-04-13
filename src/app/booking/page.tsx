import { Suspense } from 'react'
import { Booking } from '@/views/Booking'

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="pt-48 pb-24 text-center min-h-screen bg-brand-cream">
        <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <h2 className="text-2xl font-serif text-brand-brown animate-pulse">Initializing Booking...</h2>
      </div>
    }>
      <Booking />
    </Suspense>
  )
}

