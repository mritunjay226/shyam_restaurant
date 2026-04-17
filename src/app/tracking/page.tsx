import { Suspense } from 'react'
import { Metadata } from 'next';
import { Tracking } from '@/views/Tracking';

export const metadata: Metadata = {
  title: "Track Your Booking | Shyam Hotel Prayagraj",
  description: "Check your room reservation status at Shyam Hotel & Restaurant Prayagraj using your unique tracking code.",
};

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="pt-48 pb-24 text-center min-h-screen bg-brand-cream">
        <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <h2 className="text-2xl font-serif text-brand-brown animate-pulse">Loading Tracking System...</h2>
      </div>
    }>
      <Tracking />
    </Suspense>
  )
}
