"use client"
import Link from 'next/link';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream pt-24 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter mb-8">
              SHAYAM<span className="text-brand-red">.</span>
            </h2>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-colors text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-colors text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-colors text-xs font-bold">
                X
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <h4 className="font-serif text-2xl mb-6">Get tasty news straight to your inbox</h4>
            <p className="text-brand-cream/60 text-sm mb-6">No spam — just fresh updates, special offers, and mouthwatering news.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address..." 
                className="bg-transparent border-b border-brand-cream/30 text-brand-cream px-2 py-2 flex-1 focus:outline-none focus:border-brand-red transition-colors"
              />
              <button type="submit" className="bg-brand-red hover:bg-brand-red-hover text-white font-medium px-6 py-3 rounded-full text-sm transition-all duration-300 active:scale-95 uppercase tracking-wider">
                Subscribe
              </button>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mt-12 text-base text-brand-cream/70">
              <Link href="/" className="hover:text-white py-2 transition-colors flex items-center">1. Home</Link>
              <Link href="/rooms" className="hover:text-white py-2 transition-colors flex items-center">2. Rooms</Link>
              <Link href="/restaurant" className="hover:text-white py-2 transition-colors flex items-center">3. Dining</Link>
              <Link href="/cafe" className="hover:text-white py-2 transition-colors flex items-center">4. Cafe</Link>
              <Link href="/banquet" className="hover:text-white py-2 transition-colors flex items-center">5. Banquets</Link>
              <Link href="/booking" className="hover:text-white py-2 transition-colors flex items-center">6. Booking</Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-brand-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-cream/40"
        >
          <p>&copy; {new Date().getFullYear()} Shayam Hotel & Restaurant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-cream">Terms & Condition</a>
            <a href="#" className="hover:text-brand-cream">Privacy Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
