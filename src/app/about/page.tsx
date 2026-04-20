import { Metadata } from 'next'
import { About } from '@/views/About'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us | Shyam Hotel & Restaurant',
  description: 'Learn about the rich heritage, values, and world-class hospitality of Shyam Hotel in Prayagraj. Experience the perfect blend of tradition and innovation.',
  keywords: ['Shyam Hotel', 'Shyam Restaurant', 'Prayagraj', 'Hospitality', 'Luxury Hotel India', 'Fine Dining Prayagraj'],
}




export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  );
}