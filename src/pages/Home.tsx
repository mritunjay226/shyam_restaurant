"use client"
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowDown, BedDouble, UtensilsCrossed, Coffee, PartyPopper, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "25%"]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const amenities = [
    { title: "Infinity Pool", desc: "Temperature-controlled with panoramic city views.", img: "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=1200&auto=format&fit=crop" },
    { title: "Wellness Spa", desc: "Holistic treatments and massage therapies.", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" },
    { title: "Fitness Center", desc: "State-of-the-art equipment available 24/7.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
    { title: "Executive Lounge", desc: "Exclusive access for suite guests.", img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop" },
    { title: "Private Cabanas", desc: "Relax in your own secluded poolside sanctuary.", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop" }
  ];

  const glimpses = [
    { name: 'Grand Suite', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=300&auto=format&fit=crop' },
    { name: 'Fine Dining', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop' },
    { name: 'Artisan Coffee', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=300&auto=format&fit=crop' },
    { name: 'Elegant Events', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=300&auto=format&fit=crop' },
    { name: 'Cozy Corners', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=300&auto=format&fit=crop' },
    { name: 'Culinary Art', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=300&auto=format&fit=crop' },
  ];
  const marqueeItems = [...glimpses, ...glimpses, ...glimpses, ...glimpses]; // 4x for smooth infinite scroll on ultrawide

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
          className="text-6xl md:text-8xl lg:text-[8.5rem] font-serif text-brand-brown mb-16 max-w-6xl mx-auto leading-[0.95] tracking-tight"
        >
          Experience the <br/> Art of Hospitality
        </motion.h1>
        
        <div className="relative w-full">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
            <Link href="/rooms" className="w-32 h-32 bg-brand-red rounded-full text-white flex flex-col items-center justify-center border-[6px] border-brand-cream hover:scale-105 transition-transform shadow-lg">
              <ArrowDown size={18} className="mb-1" />
              <span className="text-[9px] uppercase tracking-widest text-center px-4 font-bold leading-tight mt-1">Book Your<br/>Stay</span>
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
                  duration: 30, 
                  ease: "easeInOut",
                  repeat: Infinity 
                }}
                src="https://images.unsplash.com/photo-1667125094717-47e0ff6d0608?q=80&w=863&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Luxury Hotel Exterior" 
                className="w-full h-full object-cover"
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
            <h2 className="text-4xl md:text-6xl font-serif text-brand-brown mb-10 leading-tight tracking-tight">
              Blending tradition & innovation to create unforgettable stays and dining experiences.
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              <Button className="px-8 py-6 text-xs tracking-widest uppercase">Discover Our Story</Button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-cream object-cover" alt="Customer" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-cream object-cover" alt="Customer" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full border-2 border-brand-cream object-cover" alt="Customer" />
                </div>
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
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&auto=format&fit=crop" 
                alt="Luxury Suite" 
                className="rounded-3xl w-full max-w-md object-cover shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-6 -right-6 text-xs font-serif italic text-brand-brown/60 max-w-[150px] text-right">
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
              <h2 className="text-4xl md:text-6xl font-serif text-brand-brown tracking-tight">Discover our spaces</h2>
            </div>
            <p className="text-brand-brown/70 max-w-md text-right hidden md:block">
              From restful nights to grand celebrations, Shayam Hotel offers a complete ecosystem of luxury tailored to your desires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Rooms */}
            <Link href="/rooms" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Luxury Rooms" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <BedDouble size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Accommodations</span>
                  </div>
                  <h3 className="text-4xl font-serif mb-2">Luxury Stays</h3>
                  <p className="text-sm opacity-80">17 meticulously designed rooms & suites.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-red transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Restaurant */}
            <Link href="/restaurant" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Fine Dining" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <UtensilsCrossed size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Ground Floor</span>
                  </div>
                  <h3 className="text-4xl font-serif mb-2">L'Aura Dining</h3>
                  <p className="text-sm opacity-80">Fine dining blending tradition & innovation.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-red transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>

            {/* Cafe */}
            <Link href="/cafe" className="group relative h-[400px] rounded-3xl overflow-hidden block">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cafe" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-brand-brown/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-brand-cream">
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee size={20} className="text-brand-red" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Upper Floor</span>
                  </div>
                  <h3 className="text-4xl font-serif mb-2">Horizon Café</h3>
                  <p className="text-sm opacity-80">Artisanal coffee and freshly baked pastries.</p>
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
                  <h3 className="text-4xl font-serif mb-2">Grand Banquets</h3>
                  <p className="text-sm opacity-80">4 distinctive venues for your memorable occasions.</p>
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <Badge variant="outline" className="mb-6 border-brand-brown/30">Amenities & Ambiance</Badge>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-brown tracking-tight">Curated for your comfort</h2>
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
                  <div className="h-[400px] rounded-3xl overflow-hidden relative mb-6">
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
          <div className="lg:w-1/3 sticky top-32">
            <Badge variant="outline" className="mb-6 border-brand-brown/30">Customer Reviews</Badge>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-brown leading-tight tracking-tight">
              Where every visit becomes a great memory
            </h2>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-brand-cream-dark p-8 rounded-3xl flex flex-col justify-between">
              <p className="text-brand-brown/80 mb-8 text-sm leading-relaxed">
                "Every bite was a burst of flavor! The ambiance, service, and presentation were flawless. Definitely one of the best dining experiences I've had in a long time."
              </p>
              <div className="flex justify-between items-end border-t border-brand-brown/10 pt-4 mt-auto">
                <div>
                  <p className="font-bold text-brand-brown text-sm">Daniel Johnson</p>
                  <p className="text-xs text-brand-brown/50">California, USA</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red text-sm font-bold">
                  <span className="text-brand-red">★</span> 4.9
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-brown p-8 rounded-3xl flex flex-col justify-between text-brand-cream">
              <p className="text-brand-cream/90 mb-8 text-sm leading-relaxed">
                "The staff was incredibly welcoming, and the rooms were beautifully prepared. You can tell they use the highest quality linens. Highly recommend the suites."
              </p>
              <div className="flex justify-between items-end border-t border-brand-cream/20 pt-4 mt-auto">
                <div>
                  <p className="font-bold text-sm">Sophia Lee</p>
                  <p className="text-xs text-brand-cream/50">New York, USA</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red text-sm font-bold">
                  <span>★</span> 5.0
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-cream-dark p-8 rounded-3xl flex flex-col justify-between">
              <p className="text-brand-brown/80 mb-8 text-sm leading-relaxed">
                "We celebrated my parents' anniversary here, and everything was perfect. From the decor to the desserts, it was an unforgettable evening."
              </p>
              <div className="flex justify-between items-end border-t border-brand-brown/10 pt-4 mt-auto">
                <div>
                  <p className="font-bold text-brand-brown text-sm">Emily Carter</p>
                  <p className="text-xs text-brand-brown/50">Texas, USA</p>
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
            <h2 className="text-5xl md:text-7xl font-serif text-brand-brown mb-10 leading-tight tracking-tight">
              Ready to experience <br/> the ultimate joy?
            </h2>
            <div className="flex gap-4">
              <Link href="/booking">
                <Button className="px-8 py-6 text-xs tracking-widest uppercase">Book a Room</Button>
              </Link>
              <Link href="/restaurant">
                <Button variant="outline" className="px-8 py-6 text-xs tracking-widest uppercase border-brand-brown/20">Reserve a Table</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1582719478250-c89402bb17cb?q=80&w=400&auto=format&fit=crop" className="w-full h-64 object-cover rounded-3xl" alt="Room" />
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop" className="w-full h-64 object-cover rounded-3xl mt-12" alt="Dining" />
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop" className="w-full h-48 object-cover rounded-3xl col-span-2" alt="Banquet" />
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
          <h2 className="text-4xl md:text-6xl font-serif text-brand-brown mb-6 tracking-tight">Need Assistance?</h2>
          <p className="text-brand-brown/70 mb-16 max-w-2xl mx-auto text-lg">
            Our concierge team is available 24/7 to help you with your reservation, arrange special requests, or answer any questions you may have about your stay.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-10 bg-brand-cream rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red">
                <Phone size={28} />
              </div>
              <h4 className="font-serif text-2xl text-brand-brown mb-3">Call Us</h4>
              <p className="text-brand-brown/70 text-lg">+1 (555) 123-4567</p>
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
              <p className="text-brand-brown/70 text-lg text-center">123 Luxury Avenue<br />New York, NY 10001</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Infinite Marquee Gallery Section */}
      <section className="py-32 bg-brand-brown overflow-hidden">
        <div className="text-center mb-20 relative z-10">
          <Badge className="border-brand-cream/20 text-brand-cream mb-8">A Feast for the Eyes</Badge>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-cream tracking-tight">Glimpses of Shayam Hotel</h2>
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
                  <div className="bg-brand-cream p-3 pb-12 rounded-xl shadow-2xl">
                    <img 
                      src={item.img} 
                      className="w-48 md:w-64 h-64 md:h-80 object-cover rounded-lg" 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-serif text-brand-brown text-xl">{item.name}</p>
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
