import { Suspense } from 'react'
import { Metadata } from 'next';
import { Booking } from '@/views/Booking';

export const metadata: Metadata = {
  title: "Book Your Stay | Shyam Hotel & Restaurant Prayagraj",
  description: "Fast and easy room booking at Shyam Hotel & Restaurant. Plan your stay in the heart of Civil Lines, Prayagraj today.",
};

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

