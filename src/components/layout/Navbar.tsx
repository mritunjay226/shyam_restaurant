"use client"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  // Handle smooth scrolling to hash links if on the same page
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    } else {
      // It will navigate to /#hash and the useEffect will handle the scroll
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-brand-brown/10',
        isScrolled ? 'bg-brand-cream/95 backdrop-blur-md shadow-sm' : 'bg-brand-cream'
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center h-full flex-1">
            <Link href="/" className="relative h-full flex items-center px-6 border-r border-brand-brown/10 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/#spaces" onClick={(e) => handleNavClick(e, 'spaces')} className="relative h-full flex items-center px-6 border-r border-brand-brown/10 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Spaces</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/rooms" className="relative h-full flex items-center px-6 border-r border-brand-brown/10 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Rooms</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/restaurant" className="relative h-full flex items-center px-6 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Restaurant</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="shrink-0 flex items-center justify-center px-6 h-full border-x border-brand-brown/10 md:border-x-0 lg:border-x">
            <span className="font-serif text-4xl font-bold text-brand-brown tracking-tight">
              Shayam<span className="text-brand-red">.</span>
            </span>
          </Link>

          {/* Right Nav */}
          <nav className="hidden md:flex items-center h-full flex-1 justify-end">
            <Link href="/cafe" className="relative h-full flex items-center px-6 border-l border-brand-brown/10 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Cafe</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
            </Link>
            <Link href="/banquet" className="relative h-full flex items-center px-6 border-l border-brand-brown/10 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Banquets</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
            </Link>
            <Link href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="relative h-full flex items-center px-6 border-l border-brand-brown/10 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
            </Link>
            <Link href="/booking" className="relative h-full flex items-center pl-6 text-[11px] font-bold text-brand-brown hover:text-brand-red transition-colors uppercase tracking-widest group">
              <span>Book Now</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-brown" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-cream border-t border-brand-brown/10 shadow-xl">
          <div className="flex flex-col px-4 py-6 space-y-4">
            <Link href="/" className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Home</Link>
            <Link href="/#spaces" onClick={(e) => handleNavClick(e, 'spaces')} className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Spaces</Link>
            <Link href="/rooms" className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Rooms</Link>
            <Link href="/restaurant" className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Restaurant</Link>
            <Link href="/cafe" className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Cafe</Link>
            <Link href="/banquet" className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Banquets</Link>
            <Link href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2 border-b border-brand-brown/10">Contact</Link>
            <Link href="/booking" className="text-lg font-medium text-brand-brown uppercase tracking-widest py-2">Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
