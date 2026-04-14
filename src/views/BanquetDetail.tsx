"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id, Doc } from '../../convex/_generated/dataModel';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Check, ArrowLeft, X, ChevronLeft, ChevronRight, Phone, Mail, Users, CalendarDays, Clock, ShieldAlert, Sparkles, ReceiptText } from 'lucide-react';
import { DatePicker } from '../components/ui/date-picker';
import { parseISO, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

export function BanquetDetail() {
  const params = useParams();
  const id = params?.id as Id<"banquetHalls">;
  const sysHall = useQuery(api.banquet.getHallById, id ? { hallId: id } : "skip");
  
  const menuCategories = useQuery(api.banquetMenu.getCategories, {}) as Doc<"categories">[] | undefined;
  const menuItems = useQuery(api.banquetMenu.getMenuItems, {}) as Doc<"banquetMenuItems">[] | undefined;
  
  const hallBookings = useQuery(api.banquet.getBookingsByHall, id ? { hallId: id } : "skip") || [];

  const [formState, setFormState] = useState({
    eventDate: '',
    timeSlot: 'full_day',
    eventType: 'wedding',
    guestCount: ''
  });

  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('');

  const categoryRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = React.useRef<HTMLDivElement | null>(null);

  const filteredData = React.useMemo(() => {
    if (!menuCategories || !menuItems) return { categories: [], itemsByCat: {} };
    
    const itemsByCat: Record<string, Doc<"banquetMenuItems">[]> = {};
    const categoriesWithItems = menuCategories.filter((cat: Doc<"categories">) => {
      const items = menuItems.filter((item: Doc<"banquetMenuItems">) => 
        item.categoryId === cat._id && 
        item.isAvailable &&
        (dietaryFilter === 'all' || item.dietaryType === dietaryFilter)
      );
      if (items.length > 0) {
        itemsByCat[cat._id] = items;
        return true;
      }
      return false;
    });

    return { categories: categoriesWithItems, itemsByCat };
  }, [menuCategories, menuItems, dietaryFilter]);

  // Safety cleanup for body scroll lock
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px', 
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
          const navItem = document.getElementById(`nav-${entry.target.id}`);
          if (navItem && navRef.current) {
            navItem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredData.categories]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 130; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const HALL_FALLBACKS = [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
  ];

  const checkSlotAvailability = (date: string, slot: string) => {
    if (!date) return true;
    const sameDay = hallBookings.filter(b => b.eventDate === date && b.status !== 'cancelled');
    
    if (slot === 'full_day') return sameDay.length === 0;
    
    const morningTaken = sameDay.some(b => b.timeSlot === 'morning' || b.timeSlot === 'full_day');
    const eveningTaken = sameDay.some(b => b.timeSlot === 'evening' || b.timeSlot === 'full_day');
    
    if (slot === 'morning') return !morningTaken;
    if (slot === 'evening') return !eveningTaken;
    
    return true;
  };

  const disabledDates = React.useMemo(() => {
    const dates: any[] = [{ before: startOfDay(new Date()) }];
    const bookingsByDate: Record<string, string[]> = {};
    
    hallBookings.forEach(b => {
      if (b.status !== 'cancelled') {
        if (!bookingsByDate[b.eventDate]) bookingsByDate[b.eventDate] = [];
        bookingsByDate[b.eventDate].push(b.timeSlot || 'full_day');
      }
    });

    Object.entries(bookingsByDate).forEach(([dateStr, slots]) => {
      const isMorningTaken = slots.includes('morning') || slots.includes('full_day');
      const isEveningTaken = slots.includes('evening') || slots.includes('full_day');
      if (isMorningTaken && isEveningTaken) {
        dates.push(parseISO(dateStr));
      }
    });

    return dates;
  }, [hallBookings]);

  const hall = sysHall ? (() => {
    const imgArray: string[] = sysHall.image ? [sysHall.image, ...HALL_FALLBACKS] : HALL_FALLBACKS;
    return {
      id: sysHall._id,
      name: sysHall.name,
      type: sysHall.type || 'Grand Ballroom',
      capacity: `${sysHall.capacity} Guests`,
      price: sysHall.price || 50000,
      description: sysHall.description || 'A stunning venue designed to host your most memorable occasions, from weddings to corporate retreats.',
      amenities: ['Custom Seating', 'AV System', 'Full Catering', 'Private Staging', 'Valet Parking', 'Climate Controlled', 'Bridal Suite'],
      suitability: ['Weddings & Receptions', 'Corporate Conferences', 'Ring Ceremonies', 'Birthday Galas'],
      images: imgArray,
    };
  })() : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.eventDate) return;
    const query = new URLSearchParams({ hallId: id, ...formState }).toString();
    router.push(`/booking?${query}`);
  };

  if (sysHall === undefined) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream">
        <h1 className="text-3xl font-serif text-brand-brown mb-4 animate-pulse">Loading Venue Details...</h1>
      </div>
    );
  }

  if (!hall) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen bg-brand-cream flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif text-brand-brown mb-4">Venue not found</h1>
        <Link href="/banquet"><Button>Explore Other Halls</Button></Link>
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
    document.body.style.overflow = ''; // Fixed to completely clear the lock
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % hall.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + hall.images.length) % hall.images.length);
  };

  const isSlotAvailable = checkSlotAvailability(formState.eventDate, formState.timeSlot);

  return (
    <div className="w-full pt-24 md:pt-32 pb-24 bg-brand-cream min-h-screen overflow-x-clip">
      <div className="container mx-auto px-4 md:px-6">
        
        <Link href="/banquet" className="inline-flex items-center text-xs md:text-sm text-brand-brown/60 hover:text-brand-brown mb-6 md:mb-8 transition-colors uppercase tracking-widest font-semibold">
          <ArrowLeft size={16} className="mr-2" /> Back to venues
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Details & Gallery */}
          <div className="lg:col-span-8 space-y-10 md:space-y-14">
            
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="gold">{hall.type}</Badge>
                <div className="flex items-center gap-1.5 text-brand-brown/70 text-sm font-medium bg-brand-brown/5 px-3 py-1 rounded-full">
                  <Users size={14} /> <span>Up to {hall.capacity}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-brown mb-4 leading-tight">{hall.name}</h1>
              <p className="text-base md:text-lg text-brand-brown/70 leading-relaxed max-w-3xl">{hall.description}</p>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <div 
                className="relative h-[300px] md:h-[450px] lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group bg-brand-cream-dark shadow-inner"
                onClick={() => openModal(currentImageIndex)}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={hall.images[currentImageIndex]} 
                    alt={`${hall.name} View ${currentImageIndex + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-brand-brown/5 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-brand-cream/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-brand-brown shadow-sm border border-brand-brown/10 uppercase tracking-widest">
                  Fullscreen
                </div>
              </div>

              {/* Images rail */}
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {hall.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 md:w-28 md:h-20 lg:w-32 lg:h-24 rounded-xl md:rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2 ${
                      currentImageIndex === idx 
                        ? 'border-brand-red scale-95 shadow-md' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Venue Capabilities & Amenities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-y border-brand-brown/10 py-10">
              <div>
                <h3 className="text-2xl font-serif text-brand-brown mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-brand-red" /> Venue Features
                </h3>
                <ul className="space-y-3">
                  {hall.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-brown/80">
                      <div className="w-5 h-5 rounded-full bg-brand-brown/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-brand-red" />
                      </div>
                      <span className="text-sm font-medium">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-brand-brown mb-6 flex items-center gap-2">
                  <Users size={20} className="text-brand-red" /> Ideal For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hall.suitability.map((suit, i) => (
                    <Badge key={i} variant="outline" className="border-brand-brown/20 text-brand-brown bg-brand-cream-dark px-3 py-1.5 font-normal">
                      {suit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Banquet Packages */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-brown mb-3">Event Packages</h2>
              <p className="text-brand-brown/60 mb-8 text-sm md:text-base">Comprehensive dining packages designed for large gatherings, priced per plate (PAX).</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Standard Buffet", price: "1,200", desc: "2 Soups, 3 Starters, 4 Mains, 1 Rice, Breads, 2 Desserts." },
                  { name: "Premium Gala", price: "1,600", desc: "3 Soups, 5 Starters, 5 Mains, 2 Rice, Breads, Live Chaat, 3 Desserts.", popular: true },
                  { name: "Royal Feast", price: "2,200", desc: "Premium mocktails, Live Pasta/Chaat, 6 Starters, 6 Mains, Exotic Desserts." }
                ].map((pkg, i) => (
                  <div key={i} className={cn("p-6 rounded-3xl border relative transition-all duration-300 hover:shadow-lg", 
                    pkg.popular ? "bg-brand-brown text-brand-cream border-brand-brown" : "bg-brand-cream-dark border-brand-brown/10 text-brand-brown"
                  )}>
                    {pkg.popular && <span className="absolute -top-3 left-6 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>}
                    <h4 className="font-serif text-xl mb-2">{pkg.name}</h4>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold">₹{pkg.price}</span>
                      <span className="text-xs opacity-60">/ per person</span>
                    </div>
                    <p className={cn("text-sm leading-relaxed", pkg.popular ? "text-brand-cream/70" : "text-brand-brown/60")}>{pkg.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bespoke Banquet Menu Section */}
            <div className="pt-10">
              <div className="mb-8 flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-serif text-brand-brown">Explore À La Carte Menu</h2>
                  <p className="text-brand-brown/60 text-sm md:text-base max-w-xl leading-relaxed">
                    <strong className="text-brand-brown/80">Our menu is fully customizable!</strong> The items below represent our standard offerings, but our chefs are delighted to tailor the menu to your specific tastes, dietary requirements, and event theme.
                  </p>
                </div>
                
                {/* Dietary Filter Rail */}
                <div className="flex bg-brand-cream-dark p-1.5 rounded-full border border-brand-brown/10 self-start md:self-end w-full md:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                   {['all', 'veg', 'non-veg'].map((type) => (
                     <button
                        key={type}
                        onClick={() => setDietaryFilter(type as any)}
                        className={cn(
                          "flex-1 md:flex-none px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                          dietaryFilter === type 
                            ? "bg-brand-brown text-brand-cream shadow-md" 
                            : "text-brand-brown/50 hover:text-brand-brown"
                        )}
                     >
                       {type === 'all' ? 'Full Menu' : type === 'veg' ? 'Veg Only' : 'Non-Veg'}
                     </button>
                   ))}
                </div>
              </div>

              {/* Sticky Category Nav */}
              <div 
                ref={navRef}
                className="sticky top-[70px] md:top-[80px] z-40 -mx-4 px-4 py-3 bg-brand-cream/90 backdrop-blur-xl border-y border-brand-brown/10 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <div className="flex items-center gap-2 min-w-max pb-1">
                  {filteredData.categories.map((cat: Doc<"categories">) => (
                    <button
                      key={cat._id}
                      id={`nav-${cat._id}`}
                      onClick={() => scrollToCategory(cat._id)}
                      className={cn(
                        "px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-serif transition-all whitespace-nowrap border",
                        activeCategory === cat._id
                          ? "bg-brand-brown text-brand-cream border-brand-brown shadow-md scale-105"
                          : "bg-transparent text-brand-brown/60 border-brand-brown/10 hover:bg-brand-brown/5"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {filteredData.categories.length > 0 ? (
                <div className="space-y-16">
                  {filteredData.categories.map((cat: Doc<"categories">) => {
                    const catItems = filteredData.itemsByCat[cat._id];
                    return (
                      <div key={cat._id} id={cat._id} ref={(el) => { categoryRefs.current[cat._id] = el; }} className="space-y-6 scroll-mt-32 md:scroll-mt-40">
                        <div className="flex items-center gap-4">
                          <h3 className="text-2xl md:text-3xl font-serif text-brand-brown whitespace-nowrap">{cat.name}</h3>
                          <div className="h-px bg-linear-to-r from-brand-brown/20 to-transparent w-full" />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
                          {catItems.map((item) => (
                            <div key={item._id} className="group flex justify-between items-start gap-3 border-b border-brand-brown/5 pb-3">
                              <div className="space-y-1.5 grow pr-4">
                                <div className="flex items-start gap-2">
                                  {item.dietaryType && (
                                    <div className={cn(
                                      "w-3 h-3 border flex items-center justify-center p-0.5 shrink-0 mt-1",
                                      item.dietaryType === 'veg' ? "border-green-600" : "border-red-600"
                                    )}>
                                      <div className={cn("w-full h-full rounded-full", item.dietaryType === 'veg' ? "bg-green-600" : "bg-red-600")} />
                                    </div>
                                  )}
                                  <span className="font-serif text-lg text-brand-brown group-hover:text-brand-red transition-colors">{item.name}</span>
                                </div>
                                {item.description && <p className="text-xs text-brand-brown/50 leading-relaxed italic">{item.description}</p>}
                              </div>
                              <div className="text-brand-brown font-medium text-base shrink-0 whitespace-nowrap">
                                 ₹{item.price}{item.unit ? <span className="text-[10px] opacity-50 ml-0.5">/{item.unit}</span> : ''}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-20 bg-brand-cream-dark/50 rounded-3xl border border-dashed border-brand-brown/10">
                   <p className="font-serif text-lg text-brand-brown/50">Loading fresh selections...</p>
                </div>
              )}
            </div>
            
            {/* Policies Section - Expanded with Menu Info */}
            <div className="pt-10">
              <h3 className="text-2xl font-serif text-brand-brown mb-6 flex items-center gap-2">
                <ShieldAlert size={20} className="text-brand-red" /> Terms, Conditions & Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-brand-cream-dark p-5 rounded-2xl border border-brand-brown/5">
                  <h5 className="font-bold text-brand-brown text-sm mb-2">Menu & Timings</h5>
                  <p className="text-xs text-brand-brown/70 leading-relaxed">
                    Menus can be fully tailored to your event. Some items are subject to seasonal availability. For morning events, complimentary breakfast items are strictly served between <strong>7:00 AM - 10:30 AM</strong>.
                  </p>
                </div>
                <div className="bg-brand-cream-dark p-5 rounded-2xl border border-brand-brown/5">
                  <h5 className="font-bold text-brand-brown text-sm mb-2">Booking & Payment</h5>
                  <p className="text-xs text-brand-brown/70 leading-relaxed">
                    A 25% non-refundable advance is required to secure your date. Full settlement of the agreed quote is expected 48 hours prior to the event commencement.
                  </p>
                </div>
                <div className="bg-brand-cream-dark p-5 rounded-2xl border border-brand-brown/5">
                  <h5 className="font-bold text-brand-brown text-sm mb-2">Outside Vendors</h5>
                  <p className="text-xs text-brand-brown/70 leading-relaxed">
                    Outside food and catering is strictly prohibited to maintain our quality standards. External decorators and DJs require prior written approval from hotel management.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-24 lg:top-32">
              <Card className="border border-brand-brown/10 shadow-2xl shadow-brand-brown/5 bg-white/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6 pb-6 border-b border-brand-brown/10">
                    <h3 className="text-xl font-serif text-brand-brown mb-2">Request a Quote</h3>
                    <p className="text-xs text-brand-brown/60">Fill in your event details to check availability and get accurate pricing.</p>
                  </div>

                  <form className="space-y-5" onSubmit={handleBookNow}>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-brown/80"><Sparkles size={12}/> Event Type</Label>
                      <select 
                        className="flex h-12 w-full rounded-full border border-brand-brown/20 bg-brand-cream px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown transition-all"
                        value={formState.eventType}
                        onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                      >
                        <option value="wedding">Wedding / Reception</option>
                        <option value="corporate">Corporate Event / Meeting</option>
                        <option value="birthday">Birthday / Anniversary</option>
                        <option value="other">Other Gathering</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-brown/80"><CalendarDays size={12} /> Date</Label>
                      <DatePicker 
                        date={formState.eventDate ? new Date(formState.eventDate) : undefined} 
                        setDate={(d) => setFormState({ ...formState, eventDate: d ? d.toISOString().split('T')[0] : '' })}
                        label="Select Event Date"
                        min={new Date()}
                        disabled={disabledDates}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-brown/80"><Clock size={12} /> Slot</Label>
                        <select 
                          className="flex h-12 w-full rounded-full border border-brand-brown/20 bg-brand-cream px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown transition-all"
                          value={formState.timeSlot}
                          onChange={(e) => setFormState({ ...formState, timeSlot: e.target.value })}
                        >
                          <option value="morning">Morning</option>
                          <option value="evening">Evening</option>
                          <option value="full_day">Full Day</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-brown/80"><Users size={12} /> Guests</Label>
                        <Input 
                          type="number" 
                          placeholder="Count..." 
                          className="rounded-full border-brand-brown/20 bg-brand-cream h-12 px-4"
                          value={formState.guestCount}
                          onChange={(e) => setFormState({ ...formState, guestCount: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                       {!isSlotAvailable && formState.eventDate && (
                         <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium text-center">
                            This slot is currently unavailable.
                         </div>
                       )}
                       
                       <Button 
                        type="submit" 
                        variant="gold" 
                        disabled={!isSlotAvailable || !formState.eventDate}
                        className="w-full py-6 text-sm uppercase tracking-widest font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 rounded-full"
                       >
                         {isSlotAvailable ? 'Inquire Now' : 'Unavailable'}
                       </Button>
                    </div>

                    <div className="flex items-start gap-2 pt-2 text-brand-brown/40">
                      <ReceiptText size={14} className="shrink-0 mt-0.5" />
                      <p className="text-[10px] leading-relaxed">
                        Submitting this form does not confirm your booking. A manager will contact you with a customized quote. Venue base rental is ₹{hall.price}.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>

        {/* Contact Section */}
        <div className="mt-12 md:mt-24 p-8 md:p-16 bg-brand-brown rounded-[40px] text-center text-brand-cream">
          <h2 className="text-3xl md:text-5xl font-serif mb-4 md:mb-6">Ready to host an unforgettable event?</h2>
          <p className="text-brand-cream/70 mb-8 md:mb-10 max-w-2xl mx-auto text-sm md:text-base">
            Prefer speaking to a human? Schedule a site visit or consult with our event managers directly to craft your perfect package.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
             <a href="tel:+919876543210" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors">
                <Phone className="text-brand-red" size={18} />
                <span className="font-serif text-lg tracking-wide">+91 98765 43210</span>
             </a>
             <a href="mailto:events@sarovarpalace.com" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors">
                <Mail className="text-brand-red" size={18} />
                <span className="font-serif text-lg tracking-wide">events@sarovarpalace.com</span>
             </a>
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
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <button className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-black/50 p-2 md:p-4 rounded-full" onClick={prevImage}>
              <ChevronLeft size={32} />
            </button>
            
            <button className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-black/50 p-2 md:p-4 rounded-full" onClick={nextImage}>
              <ChevronRight size={32} />
            </button>

            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={hall.images[currentImageIndex]} 
                alt={`${hall.name} Full View`} 
                className="w-full max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="text-center text-white/60 mt-4 font-medium tracking-widest text-xs uppercase">
                {currentImageIndex + 1} of {hall.images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}