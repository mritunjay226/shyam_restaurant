"use client"
import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Badge } from '../components/ui/badge';

export function Cafe() {
  const dbItems = useQuery(api.menuItems.getMenuByOutlet, { outlet: 'cafe' });

  const grouped = (dbItems || [])
    .filter(item => item.isAvailable)
    .reduce((acc: Record<string, any[]>, item) => {
      const cat = item.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

  const cafeMenu = Object.entries(grouped).map(([category, items]) => ({ category, items }));

  if (dbItems === undefined) {
    return <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream animate-pulse text-brand-brown">Loading Cafe Menu...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-brand-cream min-h-screen"
    >
      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920&auto=format&fit=crop"
            alt="The Horizon Cafe"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-brown/40" />
        </div>
        <div className="relative z-10 text-center px-4 mt-14 sm:mt-16">
          <Badge className="border-white/20 text-white mb-4 sm:mb-6 text-xs sm:text-sm">Upper Floor • Artisanal Coffee &amp; Pastries</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-brand-cream mb-2 sm:mb-4 tracking-tight"
          >
            Horizon Café
          </motion.h1>
        </div>
      </section>

      {/* Info */}
      <section className="py-10 sm:py-16 bg-brand-cream-dark">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-base sm:text-lg text-brand-brown/70 leading-relaxed mb-6 sm:mb-8">
            A cozy retreat overlooking the city. Enjoy our selection of single-origin coffees, premium teas, and freshly baked goods in a relaxed, light-filled environment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 border-t border-brand-brown/10 pt-6 sm:pt-8">
            <div>
              <h4 className="font-serif text-brand-brown text-lg sm:text-xl mb-1.5">Morning Coffee</h4>
              <p className="text-brand-brown/60 text-sm">6:00 AM - 11:00 AM</p>
            </div>
            <div>
              <h4 className="font-serif text-brand-brown text-lg sm:text-xl mb-1.5">All Day Menu</h4>
              <p className="text-brand-brown/60 text-sm">11:00 AM - 8:00 PM</p>
            </div>
            <div>
              <h4 className="font-serif text-brand-brown text-lg sm:text-xl mb-1.5">Contact</h4>
              <p className="text-brand-brown/60 text-sm">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-brown">Café Menu</h2>
            <div className="w-16 sm:w-24 h-1 bg-brand-red mx-auto mt-4 sm:mt-6" />
          </div>

          {cafeMenu.length === 0 ? (
            <p className="text-center text-brand-brown/50 py-12 text-lg italic">Menu coming soon…</p>
          ) : (
            <div className="space-y-8 sm:space-y-16">
              {cafeMenu.map((section, idx) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-brand-cream-dark p-5 sm:p-8 md:p-12 rounded-3xl sm:rounded-4xl shadow-sm border border-brand-brown/5"
                >
                  <h3 className="text-xl sm:text-3xl font-serif text-brand-brown mb-6 sm:mb-8 text-center">
                    {section.category}
                  </h3>
                  <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="flex gap-3 sm:gap-4 items-start">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0 border border-brand-brown/10"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1 gap-2">
                            <h4 className="font-medium text-brand-brown text-sm sm:text-base leading-snug">{item.name}</h4>
                            <span className="text-brand-brown font-semibold shrink-0 text-sm sm:text-base">₹{item.price}</span>
                          </div>
                          {item.description && (
                            <p className="text-brand-brown/60 text-xs sm:text-sm italic">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
