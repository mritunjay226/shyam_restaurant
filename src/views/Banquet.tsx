"use client"
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Users, Check } from 'lucide-react';

export function Banquet() {
  const dbHalls = useQuery(api.banquet.getAllHalls);
  
  const HALL_FALLBACKS = [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
  ];

  const banquetsData = (dbHalls || []).map((h, i) => ({
    id: h._id,
    name: h.name,
    capacity: h.capacity + ' Guests',
    price: h.price || 0,
    image: h.image || HALL_FALLBACKS[i % 4],
    description: h.description || 'A stunning venue designed to host your most memorable occasions.',
    amenities: ['Custom Seating', 'AV System', 'Full Catering', 'Private Staging']
  }));


  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Auto select first hall when loaded
  useEffect(() => {
    if (dbHalls && dbHalls.length > 0 && !selectedId) {
      setSelectedId(dbHalls[0]._id);
    }
  }, [dbHalls, selectedId]);

  if (dbHalls === undefined) {
    return <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream animate-pulse text-brand-brown">Loading Banquets...</div>;
  }

  const selectedHall = banquetsData.find(h => h.id === selectedId) || banquetsData[0];

  if (!selectedHall) {
    return <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream text-brand-brown">No Banquet Halls Found.</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-brand-cream min-h-screen pt-32 pb-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-brand-brown mb-6"
          >
            Banquets & Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-brown/70"
          >
            Four distinctive venues designed to host your most memorable occasions, from intimate corporate retreats to grand wedding celebrations.
          </motion.p>
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {banquetsData.map((hall, i) => (
            <motion.div
              key={hall.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedId(hall.id)}
              className="cursor-pointer"
            >
              <Card className={`overflow-hidden transition-all duration-300 ${selectedHall.id === hall.id ? 'ring-2 ring-brand-red shadow-lg' : 'hover:shadow-md border-transparent'} bg-brand-cream-dark`}>
                <div className="h-40 overflow-hidden rounded-t-3xl">
                  <img src={hall.image} alt={hall.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-serif font-semibold text-brand-brown mb-1 text-lg">{hall.name}</h3>
                  <div className="flex items-center text-sm text-brand-brown/60">
                    <Users size={14} className="mr-1" /> {hall.capacity}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail & Enquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Detail View */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              key={selectedHall.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-cream-dark rounded-4xl p-8 shadow-sm border border-brand-brown/10"
            >
              <div className="h-[400px] rounded-3xl overflow-hidden mb-8">
                <img src={selectedHall.image} alt={selectedHall.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-4xl font-serif text-brand-brown">{selectedHall.name}</h2>
                <div className="bg-brand-cream text-brand-brown px-4 py-2 rounded-full font-semibold text-sm border border-brand-brown/10">
                  Starting at ₹{selectedHall.price}
                </div>
              </div>
              
              <p className="text-brand-brown/70 text-lg mb-8 leading-relaxed">
                {selectedHall.description}
              </p>

              <h3 className="text-2xl font-serif text-brand-brown mb-4">Included Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedHall.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 text-brand-brown/80">
                    <Check size={16} className="text-brand-red" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-brand-brown rounded-4xl p-8 text-brand-cream sticky top-32 shadow-xl">
              <h3 className="text-3xl font-serif mb-2 text-brand-cream">Enquire Now</h3>
              <p className="text-brand-cream/60 text-sm mb-8">Fill out the form below and our event planning team will contact you shortly.</p>
              
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Enquiry Sent!'); }}>
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-brand-cream/80">Event Type</Label>
                  <Select id="eventType" className="bg-brand-brown-light border-brand-brown-light text-brand-cream">
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Birthday Party</option>
                    <option>Other</option>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-brand-cream/80">Preferred Date</Label>
                  <Input id="date" type="date" className="bg-brand-brown-light border-brand-brown-light text-brand-cream" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-brand-cream/80">Guest Count</Label>
                  <Input id="guests" type="number" placeholder="e.g. 150" className="bg-brand-brown-light border-brand-brown-light text-brand-cream placeholder:text-brand-cream/40" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-brand-cream/80">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" className="bg-brand-brown-light border-brand-brown-light text-brand-cream placeholder:text-brand-cream/40" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-brand-cream/80">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-brand-brown-light border-brand-brown-light text-brand-cream placeholder:text-brand-cream/40" required />
                </div>

                <Button type="submit" variant="gold" className="w-full mt-4 py-6 text-xs uppercase tracking-widest font-semibold">
                  Submit Enquiry
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
