"use client"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { roomsData } from '../data/dummy';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Check, ArrowLeft, X, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export function RoomDetail() {
  const params = useParams();
  const id = params?.id as Id<"rooms">;
  const sysRoom = useQuery(api.rooms.getRoomById, id ? { roomId: id } : "skip");
  
  const room = sysRoom ? (() => {
    const catKey = sysRoom.category?.toLowerCase() || 'standard';
    const fallbacks: Record<string, string[]> = {
      luxury: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89402bb17cb?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
      ],
      premium: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
      ],
      suite: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
      ],
    };
    const fallback = fallbacks[catKey] || fallbacks.luxury;

    const imgArray: string[] = sysRoom.images && sysRoom.images.length > 0
      ? sysRoom.images
      : sysRoom.image
        ? [sysRoom.image, ...fallback]
        : fallback;

    return {
      id: sysRoom._id,
      name: `Room ${sysRoom.roomNumber}`,
      category: sysRoom.category,
      price: sysRoom.tariff,
      description: sysRoom.description || 'Experience comfort and elegance.',
      amenities: sysRoom.amenities || ['King Size Bed', 'AC', 'Free WiFi', 'Smart TV'],
      images: imgArray,
      size: '350 sq ft',
      bedType: '1 King Bed'
    };
  })() : null;


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (sysRoom === undefined) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream">
        <h1 className="text-3xl font-serif text-brand-brown mb-4 animate-pulse">Loading Room Details...</h1>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream">
        <h1 className="text-3xl font-serif text-brand-brown mb-4">Room not found</h1>
        <Link href="/rooms">
          <Button>Back to Rooms</Button>
        </Link>
      </div>
    );
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="w-full pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <Link href="/rooms" className="inline-flex items-center text-sm text-brand-brown/60 hover:text-brand-brown mb-8 transition-colors uppercase tracking-widest font-semibold">
          <ArrowLeft size={16} className="mr-2" /> Back to all rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          
          {/* Left Column: Details & Gallery */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="gold">{room.category}</Badge>
                <span className="text-brand-brown/60 text-sm">{room.size} • {room.bedType}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-brand-brown mb-4">{room.name}</h1>
              <p className="text-lg text-brand-brown/70 leading-relaxed">{room.description}</p>
            </div>

            {/* Gallery: Product Style */}
            <div className="space-y-4">
              {/* Main Image View */}
              <div 
                className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer group bg-brand-cream-dark shadow-inner"
                onClick={() => openModal(currentImageIndex)}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={room.images[currentImageIndex]} 
                    alt={`${room.name} View ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-brand-brown/5 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-6 right-6 bg-brand-cream/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-brand-brown shadow-sm border border-brand-brown/10 uppercase tracking-widest">
                  View Fullscreen
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 h-24 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2 ${
                      currentImageIndex === idx 
                        ? 'border-brand-red scale-95 shadow-md' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${room.name} Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-3xl font-serif text-brand-brown mb-6">Room Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 text-brand-brown/80">
                    <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-brand-red" />
                    </div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <Card className="border-none shadow-xl bg-brand-cream-dark">
                <CardContent className="p-8">
                  <div className="flex items-end gap-2 mb-8 pb-6 border-b border-brand-brown/10">
                    <span className="text-5xl font-serif text-brand-brown">₹{room.price}</span>
                    <span className="text-brand-brown/60 mb-1">/ night</span>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href='/booking'; }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="checkin">Check-in</Label>
                        <Input id="checkin" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="checkout">Check-out</Label>
                        <Input id="checkout" type="date" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests">Guests</Label>
                      <select id="guests" className="flex h-12 w-full rounded-full border border-brand-brown/20 bg-brand-cream px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown">
                        <option>1 Adult</option>
                        <option>2 Adults</option>
                        <option>2 Adults, 1 Child</option>
                      </select>
                    </div>

                    <Button type="submit" variant="gold" className="w-full py-6 text-sm uppercase tracking-widest font-semibold transition-all duration-300 active:scale-95">
                      Book This Room
                    </Button>
                    <p className="text-xs text-center text-brand-brown/60 mt-4">
                      You won't be charged yet.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>

        {/* Contact Section */}
        <div className="border-t border-brand-brown/10 pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-brown mb-6">Need Assistance?</h2>
            <p className="text-brand-brown/70 mb-12 max-w-2xl mx-auto">
              Our concierge team is available 24/7 to help you with your reservation, arrange special requests, or answer any questions you may have about your stay.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-8 bg-brand-cream-dark rounded-3xl">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                  <Phone size={24} />
                </div>
                <h4 className="font-serif text-xl text-brand-brown mb-2">Call Us</h4>
                <p className="text-brand-brown/70">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex flex-col items-center p-8 bg-brand-cream-dark rounded-3xl">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                  <Mail size={24} />
                </div>
                <h4 className="font-serif text-xl text-brand-brown mb-2">Email Us</h4>
                <p className="text-brand-brown/70">reservations@shayam.com</p>
              </div>
              
              <div className="flex flex-col items-center p-8 bg-brand-cream-dark rounded-3xl">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                  <MapPin size={24} />
                </div>
                <h4 className="font-serif text-xl text-brand-brown mb-2">Visit Us</h4>
                <p className="text-brand-brown/70 text-center">123 Luxury Avenue<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeModal}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={closeModal}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-4"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
            
            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-4"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>

            <div className="w-full max-w-6xl px-12 md:px-24" onClick={(e) => e.stopPropagation()}>
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={room.images[currentImageIndex]} 
                alt={`${room.name} View ${currentImageIndex + 1}`} 
                className="w-full max-h-[85vh] object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="text-center text-white/70 mt-4 font-medium tracking-widest text-sm">
                {currentImageIndex + 1} / {room.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
