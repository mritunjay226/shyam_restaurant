"use client"
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  History, Heart, Star, Users, ArrowRight,
  Coffee, UtensilsCrossed, BedDouble, PartyPopper
} from 'lucide-react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const pillars = [
    {
      icon: <History className="w-6 h-6" />,
      title: "Rich Heritage",
      desc: "Founded on the principles of classic hospitality, Shyam has been a cornerstone of Prayagraj's social fabric for decades."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Genuine Care",
      desc: "We believe in 'Atithi Devo Bhava'—treating every guest as a divine visitor with warmth and meticulous attention."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Uncompromising Quality",
      desc: "From the thread count of our linens to the provenance of our coffee beans, we never settle for second best."
    }
  ];

  const team = [
    {
      name: "Chef Vikram Singh",
      role: "Executive Culinary Director",
      image: "https://images.unsplash.com/photo-1583394838336-acd97773df81?q=80&w=800&auto=format&fit=crop",
      bio: "With over 20 years of experience in luxury dining, Chef Vikram blends traditional Indian flavors with modern techniques."
    },
    {
      name: "Ananya Sharma",
      role: "Director of Guest Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      bio: "Ananya ensures that every stay at Shyam is personalized and exceeds the expectations of our global clientele."
    },
    {
      name: "Rajesh Malhotra",
      role: "General Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      bio: "A visionary in the hospitality industry, Rajesh oversees our commitment to excellence across all our outlets."
    }
  ];

  const experiences = [
    {
      title: "The Restaurant",
      tagline: "Fine Dining Legacy",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      link: "/restaurant",
      img: "https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776096509/reataurant_ouzt5y.jpg"
    },
    {
      title: "The Café",
      tagline: "Artisanal Brews",
      icon: <Coffee className="w-5 h-5" />,
      link: "/cafe",
      img: "https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776091186/cafe-out_jnqvn2.jpg"
    },
    {
      title: "Luxury Rooms",
      tagline: "Restful Sanctuary",
      icon: <BedDouble className="w-5 h-5" />,
      link: "/rooms",
      img: "https://res.cloudinary.com/diah8zonu/image/upload/v1776090129/shyam-hotel/qfsqnmyhsjja0uvilffn.jpg"
    },
    {
      title: "Banquets",
      tagline: "Grand Celebrations",
      icon: <PartyPopper className="w-5 h-5" />,
      link: "/banquet",
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div ref={containerRef} className="w-full bg-brand-cream selection:bg-brand-red selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b-8 border-brand-brown">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop" 
            alt="Shyam Hotel Heritage"
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 border-white/30 text-white bg-white/10 backdrop-blur-md px-6 py-2">
              Our Journey Since Inception
            </Badge>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[0.95] tracking-tight">
              The Art of <br /> Timeless Hospitality
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              For decades, Shyam Hotel has stood as a beacon of luxury and tradition in the heart of Prayagraj, blending Victorian elegance with modern sophistication.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 text-white">
          <div className="w-1 h-12 bg-linear-to-b from-transparent to-white rounded-full opacity-50" />
        </div>
      </section>

      {/* Our Heritage Section */}
      <section className="py-24 px-4 md:px-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-8 border-brand-brown/30">Our Heritage</Badge>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-brown mb-8 leading-tight">
                A legacy built on <span className="italic">grace</span> and excellence.
              </h2>
              <div className="space-y-6 text-brand-brown/80 text-lg leading-relaxed">
                <p>
                  Located in the prestigious Civil Lines of Prayagraj, opposite the historic High Court, Shyam Hotel began as a vision to create a sanctuary of luxury in the city's bustling center.
                </p>
                <p>
                  What started as a boutique restaurant has evolved into an integrated hospitality landmark, featuring premium rooms, an artisan cafe, and state-of-the-art banquet facilities. Our journey has been defined by a relentless pursuit of perfection and a deep-rooted commitment to our community.
                </p>
                <p>
                  Today, we continue to honor our traditions while embracing the future, ensuring that every guest who walks through our doors experiences the true essence of Indian hospitality.
                </p>
              </div>
            </motion.div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
              >
                <img 
                  src="https://res.cloudinary.com/diah8zonu/image/upload/q_auto/f_auto/v1776095845/ChatGPT_Image_Apr_13_2026_09_19_41_PM_1_1_lgr5fv.png" 
                  alt="Hotel Heritage Exterior"
                  className="w-full aspect-4/5 object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-red rounded-3xl -z-0 opacity-20 blur-2xl" />
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-brown rounded-full -z-0 opacity-5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 px-4 md:px-12 bg-brand-cream-dark border-y border-brand-brown/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-brand-brown mb-4">Values that define us</h2>
            <div className="h-1 w-20 bg-brand-red mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-brand-cream p-10 rounded-3xl shadow-sm border border-brand-brown/5 hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-serif text-brand-brown mb-4">{pillar.title}</h3>
                <p className="text-brand-brown/70 leading-relaxed">{pillar.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-brand-brown group-hover:scale-125 transition-transform duration-700">
                  {pillar.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Showcase */}
      <section className="py-24 px-4 md:px-12 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 text-brand-red border-brand-red/20">The  Ecosystem</Badge>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-brown leading-tight">Everything you need for a <span className="text-brand-red">perfect</span> experience.</h2>
            </div>
            <p className="text-brand-brown/60 text-lg md:text-right">
              From dawn to dusk, our curated spaces cater to every whim and requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={exp.link} className="group block relative h-96 rounded-3xl overflow-hidden">
                  <img 
                    src={exp.img} 
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-brown/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 text-brand-cream/70 mb-2">
                       {exp.icon}
                       <span className="text-xs uppercase tracking-widest font-semibold">{exp.tagline}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-brand-cream group-hover:translate-x-2 transition-transform">{exp.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 md:px-12 bg-brand-brown text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 border-brand-cream/20 text-brand-cream bg-white/5">The Faces of Shyam</Badge>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Driven by passion and expertise</h2>
            <p className="text-brand-cream/60 max-w-2xl mx-auto">Meet the dedicated team that works tirelessly to ensure your stay is memorable and your meals are exceptional.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative"
              >
                <div className="aspect-4/5 rounded-4xl overflow-hidden mb-8 shadow-2xl relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-2xl font-serif mb-1">{member.name}</h4>
                <p className="text-brand-red font-semibold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-brand-cream/60 leading-relaxed text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-12 bg-brand-cream text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-7xl font-serif text-brand-brown mb-10 leading-tight">
            Ready to experience the <br /> <span className="italic text-brand-red font-light">Shyam</span> hospitality?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/rooms">
              <Button className="px-10 py-8 text-sm tracking-widest uppercase bg-brand-brown hover:bg-brand-red transition-all group">
                Book Your Stay <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="/restaurant">
              <Button variant="outline" className="px-10 py-8 text-sm tracking-widest uppercase border-brand-brown/20 bg-transparent hover:bg-brand-brown hover:text-white transition-all">
                Reserve a Table
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-brown/5 rounded-full blur-[100px]" />
      </section>
    </div>
  );
}
