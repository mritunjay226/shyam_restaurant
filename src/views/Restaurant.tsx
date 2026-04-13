"use client"
import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Badge } from '../components/ui/badge';

export function Restaurant() {
  const dbItems = useQuery(api.menuItems.getMenuByOutlet, { outlet: 'restaurant' });

  // Group items by category dynamically
  const grouped = (dbItems || [])
    .filter(item => item.isAvailable)
    .reduce((acc: Record<string, any[]>, item) => {
      const cat = item.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

  const restaurantMenu = Object.entries(grouped).map(([category, items]) => ({
    category,
    items
  }));

  if (dbItems === undefined) {
    return <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream animate-pulse text-brand-brown">Loading Restaurant Menu...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-brand-cream min-h-screen"
    >
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1920&auto=format&fit=crop" 
            alt="The Grand Restaurant" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-brown/60" />
        </div>
        <div className="relative z-10 text-center px-4 mt-16">
          <Badge className="border-white/20 text-white mb-6">Ground Floor • Fine Dining</Badge>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif text-brand-cream mb-4 tracking-tight"
          >
            L'Aura Dining
          </motion.h1>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-brand-cream-dark">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-lg text-brand-brown/70 leading-relaxed mb-8">
            Experience culinary excellence at L'Aura. Our executive chef curates a seasonal menu blending local ingredients with international techniques, served in an atmosphere of refined elegance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-brand-brown/10 pt-8">
            <div>
              <h4 className="font-serif text-brand-brown text-xl mb-2">Breakfast</h4>
              <p className="text-brand-brown/60 text-sm">7:00 AM - 10:30 AM</p>
            </div>
            <div>
              <h4 className="font-serif text-brand-brown text-xl mb-2">Lunch</h4>
              <p className="text-brand-brown/60 text-sm">12:30 PM - 3:00 PM</p>
            </div>
            <div>
              <h4 className="font-serif text-brand-brown text-xl mb-2">Dinner</h4>
              <p className="text-brand-brown/60 text-sm">7:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-brand-brown">A La Carte Menu</h2>
            <div className="w-24 h-1 bg-brand-red mx-auto mt-6" />
          </div>

          <div className="space-y-16">
            {restaurantMenu.map((section, idx) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-3xl font-serif text-brand-brown mb-8 border-b border-brand-brown/10 pb-4">
                  {section.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-semibold text-brand-brown text-lg">{item.name}</h4>
                        <span className="text-brand-red font-medium ml-4">${item.price}</span>
                      </div>
                      <p className="text-brand-brown/60 text-sm">{item.description}</p>
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
