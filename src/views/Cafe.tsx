"use client"
import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Badge } from '../components/ui/badge';

export function Cafe() {
  const dbItems = useQuery(api.menuItems.getMenuByOutlet, { outlet: 'cafe' });

  // Group items by category dynamically
  const grouped = (dbItems || [])
    .filter(item => item.isAvailable)
    .reduce((acc: Record<string, any[]>, item) => {
      const cat = item.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

  const cafeMenu = Object.entries(grouped).map(([category, items]) => ({
    category,
    items
  }));

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
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1920&auto=format&fit=crop" 
            alt="The Horizon Cafe" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-brown/40" />
        </div>
        <div className="relative z-10 text-center px-4 mt-16">
          <Badge className="border-white/20 text-white mb-6">Upper Floor • Artisanal Coffee & Pastries</Badge>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-brand-cream mb-4 tracking-tight"
          >
            Horizon Café
          </motion.h1>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-brand-cream-dark">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-lg text-brand-brown/70 leading-relaxed mb-8">
            A cozy retreat overlooking the city. Enjoy our selection of single-origin coffees, premium teas, and freshly baked goods in a relaxed, light-filled environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-brand-brown/10 pt-8">
            <div>
              <h4 className="font-serif text-brand-brown text-xl mb-2">Morning Coffee</h4>
              <p className="text-brand-brown/60 text-sm">6:00 AM - 11:00 AM</p>
            </div>
            <div>
              <h4 className="font-serif text-brand-brown text-xl mb-2">All Day Menu</h4>
              <p className="text-brand-brown/60 text-sm">11:00 AM - 8:00 PM</p>
            </div>
            <div>
              <h4 className="font-serif text-brand-brown text-xl mb-2">Contact</h4>
              <p className="text-brand-brown/60 text-sm">+1 (555) 123-4568</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-brand-brown">Café Menu</h2>
            <div className="w-24 h-1 bg-brand-red mx-auto mt-6" />
          </div>

          <div className="space-y-16">
            {cafeMenu.map((section, idx) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-cream-dark p-8 md:p-12 rounded-4xl shadow-sm border border-brand-brown/5"
              >
                <h3 className="text-3xl font-serif text-brand-brown mb-8 text-center">
                  {section.category}
                </h3>
                <div className="space-y-6 max-w-2xl mx-auto">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-brand-brown">{item.name}</h4>
                        <div className="flex-1 border-b border-dotted border-brand-brown/30 mx-4 relative top-[-6px]" />
                        <span className="text-brand-brown font-medium">${item.price}</span>
                      </div>
                      <p className="text-brand-brown/60 text-sm italic">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
