"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { roomsData, RoomCategory } from '../data/dummy';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function Rooms() {
  const [filter, setFilter] = useState<RoomCategory | 'All'>('All');
  const dbRooms = useQuery(api.rooms.getAllRooms);

  if (dbRooms === undefined) {
    return (
      <div className="pt-48 pb-24 text-center min-h-screen bg-brand-cream">
        <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <h2 className="text-2xl font-serif text-brand-brown animate-pulse">Fetching Accommodations...</h2>
      </div>
    );
  }


  const CATEGORY_FALLBACKS: Record<string, string[]> = {
    luxury: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89402bb17cb?q=80&w=800&auto=format&fit=crop',
    ],
    premium: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    ],
    suite: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
    ],
    standard: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
    ],
  };

  const allRooms = dbRooms.map(r => {
    const catKey = r.category?.toLowerCase() || 'standard';
    const fallback = CATEGORY_FALLBACKS[catKey] || CATEGORY_FALLBACKS.standard;
    // Build images array: prefer db images, then single db image, then fallback
    const imgArray: string[] = r.images && r.images.length > 0
      ? r.images
      : r.image
        ? [r.image, ...fallback]
        : fallback;

    return {
      id: r._id,
      name: `Room ${r.roomNumber}`,
      category: r.category as RoomCategory,
      price: r.tariff,
      description: r.description || 'Experience comfort and elegance in our elegantly crafted rooms.',
      amenities: r.amenities || ['King Size Bed', 'AC', 'Free WiFi', 'Smart TV'],
      images: imgArray,
      size: '350 sq ft',
      bedType: '1 King Bed'
    };
  });


  const filteredRooms = filter === 'All' 
    ? allRooms 
    : allRooms.filter(room => room.category === filter);

  const categories = ['All', 'Luxury', 'Premium', 'Suite'];


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full pt-32 pb-24 bg-brand-cream min-h-screen"
    >
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-brand-brown mb-6"
          >
            Our Accommodations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-brown/70"
          >
            Experience the height of comfort in our 17 meticulously designed rooms and suites.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              onClick={() => setFilter(cat as RoomCategory | 'All')}
              className="min-w-[100px]"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              layout
            >
              <Link href={`/rooms/${room.id}`} className="block h-full group">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-brand-cream-dark group-hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden rounded-t-3xl">
                    <img 
                      src={room.images[0]} 
                      alt={room.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-brand-cream/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                      <span className="font-bold text-brand-brown">₹{room.price}</span>
                      <span className="text-xs text-brand-brown/60 ml-1">/ night</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant={room.category === 'Suite' ? 'gold' : 'default'}>
                        {room.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col grow">
                    <CardTitle className="mb-3 text-brand-brown group-hover:text-brand-red transition-colors">{room.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mb-6 grow text-brand-brown/60">
                      {room.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-brown/10">
                      <div className="flex gap-2 text-brand-brown/60 text-sm italic">
                        <span>{room.size}</span>
                        <span>•</span>
                        <span>{room.bedType}</span>
                      </div>
                      <span className="text-brand-red font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Details →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
