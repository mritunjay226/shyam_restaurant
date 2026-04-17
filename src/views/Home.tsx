"use client"
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  ArrowDown, BedDouble, UtensilsCrossed, Coffee, PartyPopper,
  ChevronLeft, ChevronRight, Phone, Mail, MapPin
} from 'lucide-react';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "25%"]);

  const dbRooms = useQuery(api.rooms.getAllRooms, {});
  const dbCafeItems = useQuery(api.menuItems.getMenuByOutlet, { outlet: 'cafe' });
  const dbRestaurantItems = useQuery(api.menuItems.getMenuByOutlet, { outlet: 'restaurant' });

  const scroll = (direction: 'left' | 'right') => {

    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const amenities = [
    { title: "Executive Lounge", desc: "_", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop" },
    { title: "Best Cafeteria", desc: "_", img: "https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156180/WhatsApp_Image_2026-04-13_at_5.35.14_PM_h79mok.jpg" },
    { title: "Luxury Stay", desc: "_", img: "https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156181/838cc4f1-18e1-464d-9a43-3e5305488303_n08fcz.jpg" },
    { title: "Comfortable waiting rooms", desc: "_", img: "https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156181/WhatsApp_Image_2026-04-13_at_5.35.02_PM_ckocdl.jpg" },
  ];

  const glimpses = [
    {
      name: 'Luxury Stay',
      img: dbRooms?.[0]?.images?.[0] || dbRooms?.[0]?.image || 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776141684/shyam-hotel/gmhjckccltcybf3tadfg.jpg'
    },
    {
      name: 'Fine Dining',
      img: dbRestaurantItems?.[0]?.image || 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156180/WhatsApp_Image_2026-04-13_at_5.35.07_PM_avjor3.jpg'
    },
    {
      name: 'Artisan Coffee',
      img: dbCafeItems?.[0]?.image || 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776096509/reataurant_ouzt5y.jpg'
    },
    {
      name: 'Elegant Events',
      img: 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776090962/banquet-maybe_wrswgw.jpg'
    },
    {
      name: 'Cozy Corners',
      img: 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156181/WhatsApp_Image_2026-04-13_at_5.35.02_PM_ckocdl.jpg'
    },
    {
      name: ' ',
      img: dbRestaurantItems?.[1]?.image || 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156181/WhatsApp_Image_2026-04-13_at_5.35.01_PM_fe8d7k.jpg'
    },
    {
      name: ' ',
      img: dbRestaurantItems?.[1]?.image || 'https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776156180/034406b1-465d-485e-a97a-bff8678e5c4c_fvilsw.jpg'
    },
  ];

  // Also update the Spaces images to use real first room if available
  const roomLandingImg = dbRooms?.[0]?.images?.[0] || dbRooms?.[0]?.image || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop";

  const marqueeItems = [...glimpses, ...glimpses, ...glimpses, ...glimpses];

  return (
    <div className="w-full bg-brand-cream">
      {/* Hero Section */}
      <section className="pt-32 pb-0 text-center relative border-b-8 border-brand-brown">
        <div className="mb-6 mt-8">
          <Badge variant="outline" className="text-[10px] px-6 py-2 border-brand-brown/30 text-brand-brown font-semibold bg-transparent">
            A Haven of <strong className="mx-1">Luxury.</strong> A World of <strong className="ml-1">Taste.</strong>
          </Badge>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] font-serif text-brand-brown mb-12 md:mb-16 max-w-6xl mx-auto leading-[1.05] md:leading-[0.95] tracking-tight px-4"
        >
          Experience the <br className="hidden sm:block" /> Art of Hospitality
        </motion.h1>

        <div className="relative w-full">
          <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 z-20">
            <Link href="/rooms" className="w-24 h-24 md:w-32 md:h-32 bg-brand-red rounded-full text-white flex flex-col items-center justify-center border-4 md:border-[6px] border-brand-cream hover:scale-105 transition-transform shadow-lg">
              <ArrowDown className="mb-1 w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-center px-4 font-bold leading-tight mt-1">Book Your<br className="hidden md:block" />Stay</span>
            </Link>
          </div>
          <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
            <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <motion.img
                animate={{
                  scale: [1.1, 1.2, 1.1],
                  x: ["0%", "-2%", "0%"],
                  y: ["0%", "2%", "0%"]
                }}
                transition={{
                  duration: 20,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776095845/ChatGPT_Image_Apr_13_2026_09_19_41_PM_1_1_lgr5fv.png"
                alt="Luxury Hotel Exterior"
                className="w-full h-full object-cover bg-bottom"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-24 px-4 md:px-12 bg-brand-cream overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center"
        >
          <div className="flex-1">
            <Badge variant="outline" className="mb-8 border-brand-brown/30">Welcome to Shayam Hotel</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-brown mb-6 md:mb-10 leading-tight tracking-tight">
              Blending tradition & innovation to create unforgettable stays and dining experiences.
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
              <Link href={"/about"} className="w-full sm:w-auto px-8 py-6 text-xs tracking-widest uppercase bg-brand-red text-white rounded-full hover:bg-brand-brown transition-colors">Discover Our Story</Link>
              <div className="flex items-center gap-4">
                {/* <div className="flex -space-x-4">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-cream object-cover" alt="Customer" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-cream object-cover" alt="Customer" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-cream object-cover" alt="Customer" />
                </div> */}
                <div className="text-sm">
                  <p className="font-bold text-brand-brown">5-Star Hospitality</p>
                  <p className="text-brand-brown/60 text-xs">Loved by thousands of guests</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/diah8zonu/image/upload/v1776090129/shyam-hotel/qfsqnmyhsjja0uvilffn.jpg"
                alt="Luxury Suite"
                className="rounded-3xl w-full max-w-md object-cover shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 text-[10px] md:text-xs font-serif italic text-brand-brown/60 max-w-[130px] md:max-w-[150px] text-right bg-brand-cream/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 rounded-lg md:p-0">
                Experience the perfect <strong className="text-brand-brown">harmony</strong> of comfort and elegance
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Four Pillars (Replaces Bento Grid) */}
      <section id="spaces" className="py-24 px-4 md:px-12 bg-brand-cream-dark overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-brand-brown/20 flex items-center justify-center rotate-12 bg-brand-cream">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-brown tracking-tight">Discover our spaces</h2>
            </div>
            <p className="text-brand-brown/70 max-w-md text-left md:text-right mt-4 md:mt-0">
              From restful nights to grand celebrations, Shayam Hotel offers a complete ecosystem of luxury tailored to your desires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Rooms */}
            <Link href="/rooms" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src={roomLandingImg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Luxury Rooms" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <BedDouble size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Accommodations</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-2 text-brand-cream">Hotel Rooms</h3>
                  <p className="text-xs sm:text-sm opacity-80">17 meticulously designed rooms & suites.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-red transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Restaurant */}
            <Link href="/restaurant" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776096509/reataurant_ouzt5y.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Fine Dining" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <UtensilsCrossed size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Ground Floor</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-2 text-brand-cream">Restaurant</h3>
                  <p className="text-xs sm:text-sm opacity-80">Fine dining blending tradition & innovation.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-red transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Cafe */}
            <Link href="/cafe" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776091186/cafe-out_jnqvn2.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cafe" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Upper Floor</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-2 text-brand-cream">Café</h3>
                  <p className="text-xs sm:text-sm opacity-80">Artisanal coffee and freshly baked pastries.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-red transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Banquets */}
            <Link href="/banquet" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Banquets" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <PartyPopper size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Events</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-2 text-brand-cream">Banquets</h3>
                  <p className="text-xs sm:text-sm opacity-80">4 distinctive venues for your memorable occasions.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-red transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

          </div>
        </motion.div>
      </section>

      {/* Amenities & Ambiance Carousel */}
      <section className="py-24 px-4 md:px-12 bg-brand-cream overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 md:mb-6 border-brand-brown/30">Amenities & Ambiance</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-brown tracking-tight">Curated for your comfort</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-brand-brown/20 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-brand-cream transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-brand-brown/20 flex items-center justify-center text-brand-brown hover:bg-brand-brown hover:text-brand-cream transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative -mx-4 md:-mx-12 px-4 md:px-12">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8"
            >
              {amenities.map((amenity, idx) => (
                <div key={idx} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center shrink-0 group cursor-pointer">
                  <div className="h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden relative mb-4 md:mb-6">
                    <img src={amenity.img} alt={amenity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-brand-brown/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-brown mb-2">{amenity.title}</h3>
                  <p className="text-brand-brown/70">{amenity.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 md:px-12 bg-brand-cream border-t border-brand-brown/5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start"
        >
          <div className="lg:w-1/3 relative lg:sticky lg:top-32 mb-8 lg:mb-0 z-10">
            <Badge variant="outline" className="mb-6 border-brand-brown/30 bg-white/50 backdrop-blur-sm">
              <span className="font-bold text-blue-600 mr-1">G</span> Google Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-brown leading-tight tracking-tight">
              Where every visit becomes a great memory
            </h2>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-brand-cream-dark p-8 rounded-3xl flex flex-col justify-between">
              <p className="text-brand-brown/80 mb-8 text-sm leading-relaxed">
                "The food is absolutely tasty with fresh ingredients. It has a very pleasant and cozy ambiance, and the polite staff make it a great family-oriented restaurant."
              </p>
              <div className="flex justify-between items-end border-t border-brand-brown/10 pt-4 mt-auto">
                <div>
                  <p className="font-bold text-brand-brown text-sm">Rahul Srivastava</p>
                  <p className="text-xs text-brand-brown/50">Local Guide</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red text-sm font-bold">
                  <span className="text-brand-red">★</span> 4.5
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-brown p-8 rounded-3xl flex flex-col justify-between text-brand-cream">
              <p className="text-brand-cream/90 mb-8 text-sm leading-relaxed">
                "One of the best inexpensive spots near the High Court! Excellent North and South Indian food. The service is prompt and the interiors are beautifully maintained."
              </p>
              <div className="flex justify-between items-end border-t border-brand-cream/20 pt-4 mt-auto">
                <div>
                  <p className="font-bold text-sm">Anjali Singh</p>
                  <p className="text-xs text-brand-cream/50">Prayagraj</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red text-sm font-bold">
                  <span>★</span> 4.0
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-cream-dark p-8 rounded-3xl flex flex-col justify-between">
              <p className="text-brand-brown/80 mb-8 text-sm leading-relaxed">
                "A fantastic kid-friendly place for a casual dining out. We went for lunch and the vegetarian thali was exceptional. Highly recommended to anyone nearby."
              </p>
              <div className="flex justify-between items-end border-t border-brand-brown/10 pt-4 mt-auto">
                <div>
                  <p className="font-bold text-brand-brown text-sm">Vikram Verma</p>
                  <p className="text-xs text-brand-brown/50">Google Review</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red text-sm font-bold">
                  <span className="text-brand-red">★</span> 5.0
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Plan Your Visit Section */}
      <section className="py-24 px-4 md:px-12 bg-brand-cream overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center"
        >
          <div className="flex-1">
            <Badge variant="outline" className="mb-8 border-brand-brown/30">Plan Your Visit</Badge>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-brand-brown mb-8 md:mb-10 leading-tight tracking-tight">
              Ready to experience <br className="hidden md:block" /> the ultimate joy?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-8 py-6 text-xs tracking-widest uppercase">Book a Room</Button>
              </Link>
              <Link href="/restaurant" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-xs tracking-widest uppercase border-brand-brown/20 bg-transparent hover:bg-brand-brown hover:text-brand-cream">Reserve a Table</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 w-full mt-8 md:mt-0">
            <img src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776089519/shyam-hotel/rcphws3ceazwnrq8zdcx.jpg" className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-2xl md:rounded-3xl" alt="Room" />
            <img src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776090701/cafe_u2sfey.jpg" className="w-full h-32 sm:h-48 md:h-64 object-cover rounded-2xl md:rounded-3xl mt-6 sm:mt-12" alt="Dinning" />
            <img src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776090962/banquet-maybe_wrswgw.jpg" className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-2xl md:rounded-3xl col-span-2" alt="Banquet" />
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 md:px-12 bg-brand-cream-dark overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto text-center"
        >
          <Badge variant="outline" className="mb-8 border-brand-brown/30">Get in Touch</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-brown mb-4 md:mb-6 tracking-tight">Need Assistance?</h2>
          <p className="text-brand-brown/70 mb-12 md:mb-16 max-w-2xl mx-auto text-base md:text-lg px-4 md:px-0">
            Our concierge team is available 24/7 to help you with your reservation, arrange special requests, or answer any questions you may have about your stay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-10 bg-brand-cream rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                <Phone size={28} />
              </div>
              <h4 className="font-serif text-2xl text-brand-brown mb-3">Call Us</h4>
              <p className="text-brand-brown/70 text-lg">+91 98765 43210</p>
            </div>

            <div className="flex flex-col items-center p-10 bg-brand-cream rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                <Mail size={28} />
              </div>
              <h4 className="font-serif text-2xl text-brand-brown mb-3">Email Us</h4>
              <p className="text-brand-brown/70 text-lg">reservations@shayam.com</p>
            </div>

            <div className="flex flex-col items-center p-10 bg-brand-cream rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                <MapPin size={28} />
              </div>
              <h4 className="font-serif text-2xl text-brand-brown mb-3">Visit Us</h4>
              <p className="text-brand-brown/70 text-lg text-center">1, MG Marg, Opp. Gate No. 4<br />High Court, Civil Lines, Prayagraj</p>
            </div>
          </div>

          <div className="mt-16 md:mt-24 w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg relative border-[6px] border-white">
            <iframe
              title="Google Maps Location"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Shyam%20Restaurant,+Mahatma%20Gandhi%20Marg,+Opposite+Gate+No.+4,+High+Court,+Civil+Lines,+Prayagraj,+Uttar+Pradesh&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-start gap-4">
              <div className="bg-brand-red p-3 rounded-full text-white shrink-0 mt-1">
                <MapPin size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-brand-brown mb-1">Shyam Restaurant</p>
                <a href="https://share.google/6Fa6U7FI6DccQbDtW" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-medium">
                  View on Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Infinite Marquee Gallery Section */}
      <section className="py-32 bg-brand-brown overflow-hidden">
        <div className="text-center mb-16 md:mb-20 relative z-10 px-4">
          <Badge className="border-brand-cream/20 text-brand-cream mb-6 md:mb-8 text-xs px-4 py-1.5">A Feast for the Eyes</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-brand-cream tracking-tight">Glimpses of Shayam Hotel</h2>
        </div>

        <div className="relative w-full overflow-hidden py-10">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 px-4">
            {marqueeItems.map((item, i) => {
              const rotations = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-1'];
              const margins = ['mt-12', 'mt-0', 'mt-8', 'mt-4', 'mt-16', 'mt-0'];
              const rot = rotations[i % rotations.length];
              const mt = margins[i % margins.length];

              return (
                <div key={i} className={`relative ${rot} ${mt} transition-transform hover:scale-105 hover:z-20 cursor-pointer shrink-0`}>
                  <div className="bg-brand-cream p-3 pb-10 md:pb-12 rounded-xl shadow-2xl">
                    <img
                      src={item.img}
                      className="w-48 md:w-64 h-64 md:h-80 object-cover rounded-lg"
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-serif text-brand-brown text-lg md:text-xl px-2">{item.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
