"use client"
import Link from 'next/link';
import { motion } from 'motion/react';
// Replace Lucide icons with inline SVG
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
            <div className="flex space-x-5">
              <a 
                href="https://www.facebook.com/profile.php?id=61574364137238&rdid=S9G1gw6PNXc6SEzL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BULCiDVX7%2F#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-cream/80 group-hover:text-white transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a 
                href="https://www.instagram.com/sarover_palace_banquet?igsh=MWNnZHZ1ZGh2YTExeg%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-cream/80 group-hover:text-white transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="Twitter (X)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-cream/80 group-hover:text-white transition-colors"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all duration-300 hover:-translate-y-1 shadow-sm"
                aria-label="Youtube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-cream/80 group-hover:text-white transition-colors"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a> */}
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
