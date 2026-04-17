"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Search, Calendar, MapPin, CheckCircle2, Clock, XCircle, CreditCard } from 'lucide-react';

export function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [searchCode, setSearchCode] = useState('');

  const booking = useQuery(api.bookings.getBookingByTrackingCode, 
    searchCode ? { trackingCode: searchCode.toUpperCase() } : "skip"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setSearchCode(trackingCode.trim());
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Payment Pending';
      case 'checked_in': return 'Checked In';
      case 'checked_out': return 'Checked Out';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="w-full bg-brand-cream min-h-screen pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-brown mb-4 italic">Track Your Stay</h1>
          <p className="text-brand-brown/70">Enter your unique 6-digit tracking code to view your booking status and details.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-brown p-2 rounded-3xl shadow-2xl mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cream/40">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Enter Code (e.g. SH25AX)" 
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                className="w-full h-16 bg-brand-brown/50 border border-brand-cream/10 rounded-2xl pl-12 pr-4 text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all font-mono tracking-widest text-lg"
                maxLength={6}
              />
            </div>
            <Button 
              type="submit" 
              variant="gold" 
              size="lg"
              className="h-16 px-8 rounded-2xl uppercase tracking-widest text-sm font-bold"
            >
              Search
            </Button>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {searchCode && booking === null && (
            <motion.div 
              key="not-found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-red-100 text-center"
            >
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-brand-brown mb-2">Booking Not Found</h3>
              <p className="text-brand-brown/60">We couldn't find any booking with code "<span className="font-mono font-bold text-brand-red">{searchCode}</span>". Please check and try again.</p>
            </motion.div>
          )}

          {booking && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-brand-cream-dark rounded-4xl shadow-xl overflow-hidden border border-brand-brown/5"
            >
              {/* Header Status */}
              <div className="bg-brand-brown p-8 text-brand-cream flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-cream/60 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(booking.status)}
                    <span className="text-xl font-serif italic">{getStatusText(booking.status)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-brand-cream/60 mb-1">Tracking Code</p>
                  <p className="text-2xl font-mono font-bold text-brand-red">{booking.trackingCode}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-brand-brown/10">
                  <div className="space-y-4">
                    <h4 className="font-serif text-xl text-brand-brown">Guest Information</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-brand-brown/60">Lead Guest</p>
                      <p className="font-medium">{booking.guestName}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-brand-brown/60">Phone</p>
                      <p className="font-medium">{booking.guestPhone}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-serif text-xl text-brand-brown">Stay Details</h4>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-brand-red/70 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-brand-brown/60">Dates</p>
                        <p className="font-medium">{booking.checkIn} — {booking.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-red/70 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-brand-brown/60">Property</p>
                        <p className="font-medium">Shyam Hotel & Restaurant, Civil Lines</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-2xl p-6">
                  <h4 className="font-serif text-xl text-brand-brown mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-red/70" />
                    Payment Summary
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-brand-brown/70">
                      <span>Total Booking Amount</span>
                      <span className="font-mono">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Advance Paid (Online)</span>
                      <span className="font-mono">₹{booking.advance.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-brown/10 pt-3 text-lg font-serif italic text-brand-brown">
                      <span>Balance at Check-in</span>
                      <span className="font-mono font-bold">₹{booking.balance.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                
                {booking.status === 'confirmed' && (
                  <div className="mt-8 p-4 bg-green-50 rounded-xl flex items-start gap-3 border border-green-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-xs text-green-800 leading-relaxed">
                      Your reservation is secured. Please present your Tracking Code or Photo ID at the front desk upon arrival. Check-in starts at 12:00 PM.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
