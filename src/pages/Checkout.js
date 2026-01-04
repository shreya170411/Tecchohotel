import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { user, addBookingToHistory } = useAuth();
  
  // Get booking data from localStorage
  const [bookingData, setBookingData] = useState(() => {
    const saved = localStorage.getItem('tecchohotel_current_booking');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all required fields exist
      return {
        room: parsed.room || { name: 'Deluxe Suite', price: 299 },
        checkIn: parsed.checkIn || '',
        checkOut: parsed.checkOut || '',
        adults: parsed.adults || 1,
        children: parsed.children || 0,
        rooms: parsed.rooms || 1,
        foodService: parsed.foodService || false,
        spaService: parsed.spaService || false,
        airportPickup: parsed.airportPickup || false,
        guestName: parsed.guestName || '',
        guestAge: parsed.guestAge || '',
        specialRequests: parsed.specialRequests || '',
        total: parsed.total || 0
      };
    }
    return {
      room: { name: 'Deluxe Suite', price: 299 },
      checkIn: '',
      checkOut: '',
      adults: 1,
      children: 0,
      rooms: 1,
      foodService: false,
      spaService: false,
      airportPickup: false,
      guestName: '',
      guestAge: '',
      specialRequests: '',
      total: 0
    };
  });

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState('booking'); // 'booking', 'guest', 'payment'

  // Calculate total
  const calculateTotal = () => {
    let total = bookingData.room.price * bookingData.rooms;
    
    if (bookingData.checkIn && bookingData.checkOut) {
      const nights = (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24);
      total = bookingData.room.price * nights * bookingData.rooms;
    }
    
    if (bookingData.foodService) total += 50;
    if (bookingData.spaService) total += 100;
    if (bookingData.airportPickup) total += 75;
    
    return total.toFixed(2);
  };

  // Calculate nights
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 1;
    const nights = (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24);
    return nights || 1;
  };

  const validateForm = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return false;
    }
    
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email');
      return false;
    }
    
    if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
      alert('Please fill in payment information');
      return false;
    }
    
    if (formData.cardNumber.length < 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!user) {
      alert('Please login to complete booking!');
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const finalTotal = calculateTotal();
      const bookingDataWithTotal = {
        ...bookingData,
        total: finalTotal,
        guestName: formData.name || bookingData.guestName,
        guestEmail: formData.email,
        guestPhone: formData.phone,
        guestAddress: formData.address,
        paymentMethod: 'Credit Card',
        paymentLastFour: formData.cardNumber.slice(-4),
        nights: calculateNights()
      };
      
      // Add to booking history
      const savedBooking = addBookingToHistory(bookingDataWithTotal);
      
      // Clear current booking
      localStorage.removeItem('tecchohotel_current_booking');
      
      setIsProcessing(false);
      
      // Show success message
      alert(`✅ Booking Confirmed!\n\n📋 Booking Number: ${savedBooking.bookingNumber}\n🏨 Room: ${bookingData.room.name}\n💰 Total: $${finalTotal}\n📅 Check-in: ${bookingData.checkIn}\n📅 Check-out: ${bookingData.checkOut}\n👤 Guests: ${bookingData.adults} adults, ${bookingData.children} children\n\nA confirmation email has been sent to ${formData.email}\n\nThank you for choosing TecchoHotel!`);
      
      // Redirect to booking history
      navigate('/bookings');
    }, 1500);
  };

  const editBooking = () => {
    navigate('/rooms');
  };

  const deleteBooking = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      localStorage.removeItem('tecchohotel_current_booking');
      setBookingData({
        room: { name: 'Deluxe Suite', price: 299 },
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        rooms: 1,
        foodService: false,
        spaService: false,
        airportPickup: false,
        guestName: '',
        guestAge: '',
        specialRequests: ''
      });
      alert('Booking deleted!');
      navigate('/rooms');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`flex items-center ${activeSection === 'booking' ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'booking' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Booking Details</span>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-gray-300"></div>
            
            <div className={`flex items-center ${activeSection === 'guest' ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'guest' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Guest Info</span>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-gray-300"></div>
            
            <div className={`flex items-center ${activeSection === 'payment' ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your reservation and get ready for an amazing stay</p>
        
        {!user ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4 text-blue-600">🔒</div>
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to complete your booking and manage your reservations.</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Booking Summary</h2>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button 
                      onClick={editBooking}
                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                    >
                      ✏️ Edit Booking
                    </button>
                    <button 
                      onClick={deleteBooking}
                      className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                
                {/* Room Details */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="rounded-xl overflow-hidden">
                      <img 
                        src={bookingData.room.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400'} 
                        alt={bookingData.room.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">{bookingData.room.name}</h3>
                    <p className="text-gray-600 mb-4">{bookingData.room.description || 'Luxurious accommodation with premium amenities'}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Check-in</div>
                        <div className="font-bold">{formatDate(bookingData.checkIn)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Check-out</div>
                        <div className="font-bold">{formatDate(bookingData.checkOut)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-bold">{calculateNights()} night(s)</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Guests</div>
                        <div className="font-bold">{bookingData.adults} adults, {bookingData.children} children</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Rooms</div>
                        <div className="font-bold">{bookingData.rooms} room(s)</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Room Rate</div>
                        <div className="font-bold">${bookingData.room.price}/night</div>
                      </div>
                    </div>
                    
                    {/* Primary Guest Info */}
                    {bookingData.guestName && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Primary Guest (from booking)</div>
                        <div className="font-bold">{bookingData.guestName}, Age: {bookingData.guestAge}</div>
                      </div>
                    )}
                    
                    {/* Special Requests */}
                    {bookingData.specialRequests && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                        <div className="text-sm text-gray-500">Special Requests</div>
                        <div className="font-medium">{bookingData.specialRequests}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Services */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3">Additional Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {bookingData.foodService && (
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                        🍽️ Food Service Package
                      </div>
                    )}
                    {bookingData.spaService && (
                      <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg">
                        💆 Spa Package
                      </div>
                    )}
                    {bookingData.airportPickup && (
                      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                        🚗 Airport Pickup
                      </div>
                    )}
                    {!bookingData.foodService && !bookingData.spaService && !bookingData.airportPickup && (
                      <div className="text-gray-500">No additional services selected</div>
                    )}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-6">
                  <h4 className="font-bold mb-4">Price Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room ({bookingData.rooms} x ${bookingData.room.price} x {calculateNights()} nights)</span>
                      <span>${(bookingData.room.price * bookingData.rooms * calculateNights()).toFixed(2)}</span>
                    </div>
                    
                    {bookingData.foodService && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Food Service Package</span>
                        <span>$50.00</span>
                      </div>
                    )}
                    
                    {bookingData.spaService && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spa Package</span>
                        <span>$100.00</span>
                      </div>
                    )}
                    
                    {bookingData.airportPickup && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Airport Pickup</span>
                        <span>$75.00</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-blue-600">${calculateTotal()}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        *Taxes and service charges included
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Information Form */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Guest Information</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        onFocus={() => setActiveSection('guest')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        onFocus={() => setActiveSection('guest')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        onFocus={() => setActiveSection('guest')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St, City, State ZIP"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        onFocus={() => setActiveSection('guest')}
                      />
                    </div>
                  </div>
                  
                  {/* Payment Information */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Payment Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            // Format card number with spaces
                            const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
                            const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                            setFormData({...formData, cardNumber: value});
                          }}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          onFocus={() => setActiveSection('payment')}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={(e) => {
                            // Format as MM/YY
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setFormData({...formData, expiry: value.slice(0, 5)});
                          }}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          onFocus={() => setActiveSection('payment')}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                            setFormData({...formData, cvv: value});
                          }}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          onFocus={() => setActiveSection('payment')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 mr-3"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms & Conditions
                      </a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Cancellation Policy
                      </a>
                      . I understand that I will receive a confirmation email and that my credit card will be charged upon booking.
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Processing...
                        </div>
                      ) : (
                        `Complete Booking & Pay $${calculateTotal()}`
                      )}
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      You will be redirected to a secure payment page
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Help & Info */}
            <div className="space-y-6">
              {/* User Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <span className="mr-2">👤</span> Account Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Logged in as:</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Support */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-3 flex items-center">
                  <span className="mr-2">🛎️</span> Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">📞</span>
                    <div>
                      <div className="font-medium">Call Us</div>
                      <div className="text-sm text-gray-600">1-800-TECCHO-HOTEL</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">✉️</span>
                    <div>
                      <div className="font-medium">Email Us</div>
                      <div className="text-sm text-gray-600">support@tecchohotel.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">💬</span>
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-gray-600">Available 24/7</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-4">Why Book With Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> Best Price Guarantee
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> Free Cancellation (24h notice)
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> No Hidden Fees
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> 24/7 Customer Support
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> Secure SSL Encryption
                  </li>
                </ul>
              </div>
              
              {/* Booking Policy */}
              <div className="bg-yellow-50 rounded-2xl shadow-lg p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <span className="mr-2">📋</span> Booking Policy
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Check-in: 3:00 PM</li>
                  <li>• Check-out: 11:00 AM</li>
                  <li>• Free WiFi included</li>
                  <li>• Parking: $20/day</li>
                  <li>• Pets not allowed</li>
                  <li>• Smoking prohibited</li>
                </ul>
              </div>
              
              {/* Security Badge */}
              <div className="bg-green-50 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="text-3xl">🔒</div>
                </div>
                <h3 className="font-bold text-center mb-2">Secure Booking</h3>
                <p className="text-center text-sm text-gray-600">
                  Your payment and personal information are protected with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}