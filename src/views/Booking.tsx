"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { DatePicker } from '../components/ui/date-picker';

const COUNTRY_CODES = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'USA/Canada' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  { code: '+971', name: 'UAE' },
  { code: '+65', name: 'Singapore' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+81', name: 'Japan' },
];



export function Booking() {
  const dbRooms = useQuery(api.rooms.getAllRooms) || [];
  const roomsData = dbRooms.map(r => ({
    id: r._id,
    name: `Room ${r.roomNumber}`,
    price: r.tariff
  }));

  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [step, setStep] = useState(1);
  const createBooking = useMutation(api.bookings.createBooking);

  // Fetch bookings for the selected room to disable taken dates
  const roomBookings = useQuery(api.bookings.getBookingsByRoom, 
    selectedRoom ? { roomId: selectedRoom as any } : "skip"
  ) || [];
  const [isProcessing, setIsProcessing] = useState(false);

  const searchParams = useSearchParams();

  // Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Adults');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  // Compute disabled dates for the calendar
  const disabledDates = React.useMemo(() => {
    const dates: any[] = [{ before: new Date() }]; // Always disable past
    
    roomBookings.forEach(b => {
      if (b.status !== 'cancelled' && b.status !== 'checked_out') {
        dates.push({
          from: new Date(b.checkIn),
          to: new Date(b.checkOut)
        });
      }
    });

    return dates;
  }, [roomBookings]);

  useEffect(() => {
    // 1. Parse URL parameters
    const rId = searchParams.get('roomId');
    const cin = searchParams.get('checkIn');
    const cout = searchParams.get('checkOut');
    const g = searchParams.get('guests');

    // Only set if current value is empty - this prevents background re-renders 
    // from overriding user's manual selections
    if (rId && !selectedRoom) setSelectedRoom(rId);
    if (cin && !checkIn) setCheckIn(cin);
    if (cout && !checkOut) setCheckOut(cout);
    if (g && guests === '2 Adults') setGuests(g); // '2 Adults' is the default

    // 2. Initial room set from DB if not provided in URL and nothing selected
    if (roomsData.length > 0 && !selectedRoom && !rId) {
      setSelectedRoom(roomsData[0].id);
    }

    // 3. Auto-skip to Step 2 if ALL necessary details are provided initially
    if (rId && cin && cout && step === 1 && !firstName) {
      setStep(2);
    }
  }, [roomsData, searchParams, step, selectedRoom, checkIn, checkOut, guests, firstName]);

  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!checkOut) newErrors.checkOut = 'Check-out date is required';
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(3);
    }
  };

  const room = roomsData.find(r => r.id === selectedRoom) || { name: 'Loading...', price: 0 };
  
  let nights = 1;
  if (checkIn && checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
    if (diff > 0) nights = diff;
  }

  const total = room.price * nights;
  const advance = total * 0.2; // 20% advance
  const balance = total - advance;

  const today = new Date().toISOString().split('T')[0];


  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});
    
    try {
      await createBooking({
        roomId: selectedRoom as any,
        guestName: `${firstName.trim()} ${lastName.trim()}`,
        guestPhone: `${countryCode}${phone}`,
        checkIn,

        checkOut,
        tariff: room.price,
        advance: advance,
        totalAmount: total,
        notes: `Email: ${email}, Guests: ${guests}`,
        source: 'website'
      });
      setIsProcessing(false);
      setStep(4);
    } catch (err: any) {
      setIsProcessing(false);
      setErrors({ submit: err.message });
      setStep(1); // Return to start to adjust overlapping dates
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-brand-cream min-h-screen pt-32 pb-24"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Progress Bar */}
        {step < 4 && (
          <div className="mb-12">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-brand-brown/10 z-0" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-red z-0 transition-all duration-500" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              
              {[1, 2, 3].map((s) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-brand-red text-white' : 'bg-brand-cream-dark text-brand-brown/40 border border-brand-brown/10'}`}>
                    {s}
                  </div>
                  <span className={`absolute top-12 text-xs font-medium whitespace-nowrap ${step >= s ? 'text-brand-brown' : 'text-brand-brown/40'}`}>
                    {s === 1 ? 'Select Room' : s === 2 ? 'Guest Details' : 'Payment'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-brand-cream-dark rounded-4xl shadow-xl overflow-hidden border border-brand-brown/5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Left Side: Summary (Always visible on desktop) */}
            <div className="bg-brand-brown text-brand-cream p-8 md:col-span-1 hidden md:block">
              <h3 className="font-serif text-2xl text-brand-cream mb-6">Booking Summary</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-brand-cream/60 text-[10px] uppercase tracking-widest mb-1">Room</p>
                  <p className="font-medium">{room.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-brand-cream/60 text-[10px] uppercase tracking-widest mb-1">Check-in</p>
                    <p className="font-medium text-sm">{checkIn || 'Not selected'}</p>
                  </div>
                  <div>
                    <p className="text-brand-cream/60 text-[10px] uppercase tracking-widest mb-1">Check-out</p>
                    <p className="font-medium text-sm">{checkOut || 'Not selected'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-brand-cream/60 text-[10px] uppercase tracking-widest mb-1">Guests</p>
                  <p className="font-medium text-sm">{guests}</p>
                </div>

                <div className="pt-6 border-t border-brand-cream/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-cream/60">{room.price} x {nights} nights</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-brand-cream/60">Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between font-serif text-2xl text-brand-cream mt-4 pt-4 border-t border-brand-cream/10">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Forms */}
            <div className="p-8 md:col-span-2">
              
              {/* Step 1: Select Room & Dates */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-3xl font-serif text-brand-brown mb-6">Stay Details</h2>
                  {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                      {errors.submit}
                    </div>
                  )}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Select Room</Label>
                      <Select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                        {roomsData.map(r => (
                          <option key={r.id} value={r.id}>{r.name} - ${r.price}/night</option>
                        ))}
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Check-in Date</Label>
                        <DatePicker 
                          date={checkIn ? new Date(checkIn) : undefined} 
                          setDate={(d) => setCheckIn(d ? d.toISOString().split('T')[0] : '')}
                          label="Select Check-in"
                          min={new Date()}
                          disabled={disabledDates}
                        />

                        {errors.checkIn && <p className="text-red-500 text-xs">{errors.checkIn}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Check-out Date</Label>
                        <DatePicker 
                          date={checkOut ? new Date(checkOut) : undefined} 
                          setDate={(d) => setCheckOut(d ? d.toISOString().split('T')[0] : '')}
                          label="Select Check-out"
                          min={checkIn ? new Date(checkIn) : new Date()}
                          disabled={disabledDates}
                        />

                        {errors.checkOut && <p className="text-red-500 text-xs">{errors.checkOut}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Guests</Label>
                      <Select value={guests} onChange={(e) => setGuests(e.target.value)}>
                        <option value="1 Adult">1 Adult</option>
                        <option value="2 Adults">2 Adults</option>
                        <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                      </Select>
                    </div>

                    <Button className="w-full mt-8" size="lg" onClick={validateStep1}>
                      Continue to Guest Details
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Guest Details */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-3xl font-serif text-brand-brown mb-6">Guest Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input 
                          placeholder="John" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)}
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input 
                          placeholder="Doe" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)}
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="flex gap-2">
                        <select 
                          value={countryCode} 
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="flex h-12 w-24 rounded-2xl border border-brand-brown/20 bg-brand-cream px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.code}</option>
                          ))}
                        </select>
                        <Input 
                          type="tel" 
                          placeholder="000-000-0000" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>


                    <div className="space-y-2">
                      <Label>Special Requests (Optional)</Label>
                      <textarea 
                        className="flex w-full rounded-2xl border border-brand-brown/20 bg-brand-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-brown min-h-[100px]"
                        placeholder="Any special requests?"
                      />
                    </div>

                    <div className="flex gap-4 mt-8">
                      <Button variant="outline" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
                      <Button className="w-2/3" onClick={validateStep2}>Continue to Payment</Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-3xl font-serif text-brand-brown mb-6">Payment</h2>
                  
                  <div className="bg-brand-cream p-6 rounded-2xl border border-brand-brown/10 mb-8">
                    <h4 className="font-semibold text-brand-brown mb-4">Payment Breakdown</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-brand-brown/70">Total Amount</span>
                        <span className="font-medium">${total}</span>
                      </div>
                      <div className="flex justify-between text-brand-red font-medium">
                        <span>Advance to Pay Now (20%)</span>
                        <span>${advance}</span>
                      </div>
                      <div className="flex justify-between border-t border-brand-brown/10 pt-3 mt-3">
                        <span className="text-brand-brown/70">Balance at Hotel</span>
                        <span className="font-medium">${balance}</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handlePayment}>
                    <Button 
                      type="submit" 
                      variant="gold" 
                      className="w-full py-6 text-sm uppercase tracking-widest"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay $${advance} with Razorpay`}
                    </Button>
                    <p className="text-xs text-center text-brand-brown/60 mt-4">
                      This is a secure, encrypted payment gateway.
                    </p>
                    <Button type="button" variant="ghost" className="w-full mt-2" onClick={() => setStep(2)} disabled={isProcessing}>
                      Back to Details
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-serif text-brand-brown mb-4">Booking Confirmed!</h2>
                  <p className="text-brand-brown/70 mb-8">
                    Thank you for choosing Shayam Hotel. Your booking reference is <strong className="text-brand-brown">#SH-84729</strong>. We've sent a confirmation email with details.
                  </p>
                  <Button onClick={() => window.location.href='/'} variant="outline">
                    Return to Home
                  </Button>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
