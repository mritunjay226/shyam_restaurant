"use client"
import { AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <div>
            {children}
          </div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
