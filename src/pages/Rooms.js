import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../data/mockData';

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
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

  const handleBooking = (room) => {
    setSelectedRoom(room);
    setBookingDetails({
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
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    
    let total = selectedRoom.price * bookingDetails.rooms;
    
    // Calculate nights if dates are selected
    if (bookingDetails.checkIn && bookingDetails.checkOut) {
      const nights = (new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24);
      total = selectedRoom.price * nights * bookingDetails.rooms;
    }
    
    if (bookingDetails.foodService) total += 50;
    if (bookingDetails.spaService) total += 100;
    if (bookingDetails.airportPickup) total += 75;
    
    return total.toFixed(2);
  };

  const handleBookNow = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }
  
    if (!bookingDetails.guestName || !bookingDetails.guestAge) {
        alert('Please enter guest information');
        return;
    }
  
    const total = calculateTotal();
    const bookingData = {
        room: selectedRoom,
        ...bookingDetails,
        total: total
    };
  
  // Save to localStorage as current booking
    localStorage.setItem('tecchohotel_current_booking', JSON.stringify(bookingData));
  
    alert('Booking details saved! Proceeding to checkout...');
    setSelectedRoom(null);
  
  // Redirect to checkout page
    window.location.href = '/checkout';
  };

  const getAmenitiesIcons = (amenity) => {
    const icons = {
      'WiFi': '📶',
      'TV': '📺',
      'AC': '❄️',
      'Breakfast': '🍳',
      'Work Desk': '💼',
      'Kitchen': '👨‍🍳',
      '2 Beds': '🛏️🛏️',
      'Balcony': '🌅',
      'Bathtub': '🛁',
      'Minibar': '🍷'
    };
    return icons[amenity] || '✅';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Our Luxury Rooms & Suites</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Experience unparalleled comfort and luxury in our meticulously designed rooms. 
            Each space is crafted to provide the perfect blend of elegance and functionality.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              ✓ Best Price Guarantee
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              ✓ Free Cancellation
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              ✓ Instant Confirmation
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Find Your Perfect Stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
              <select className="w-full p-2 border rounded-lg">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                Search Rooms
              </button>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <div key={room.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                {room.price > 350 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Premium
                  </span>
                )}
                {room.price <= 200 && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Best Value
                  </span>
                )}
              </div>
              
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">${room.price}<span className="text-sm text-gray-500 font-normal">/night</span></div>
                    <div className="text-xs text-gray-500">+ taxes & fees</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                        <span className="text-xs">{getAmenitiesIcons(amenity)}</span>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Room Details */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">👤</span>
                    <span>Max 4 Guests</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📏</span>
                    <span>45 m²</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🛏️</span>
                    <span>King Bed</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🪟</span>
                    <span>City View</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleBooking(room)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                  <Link
                    to={`/room/${room.id}`}
                    className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold text-lg mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your payment and personal data are protected</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-bold text-lg mb-2">Flexible Cancellation</h3>
              <p className="text-gray-600">Free cancellation up to 24 hours before check-in</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Best Price Guaranteed</h3>
              <p className="text-gray-600">Found a better price? We'll match it plus 10% off</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Book {selectedRoom.name}</h2>
                  <p className="text-gray-600">Complete your reservation in a few simple steps</p>
                </div>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Room Info */}
                <div>
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img 
                      src={selectedRoom.image} 
                      alt={selectedRoom.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-3 text-gray-800">Room Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room Type:</span>
                        <span className="font-bold">{selectedRoom.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nightly Rate:</span>
                        <span className="font-bold text-blue-600">${selectedRoom.price}/night</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span>45 m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bed Type:</span>
                        <span>King Size</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Occupancy:</span>
                        <span>2 Adults, 2 Children</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Booking Form */}
                <div>
                  {/* Step Indicator */}
                  <div className="flex items-center mb-8">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="h-1 w-8 bg-blue-600"></div>
                    <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="h-1 w-8 bg-gray-300"></div>
                    <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Select Dates & Guests</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in Date *
                        </label>
                        <input
                          type="date"
                          value={bookingDetails.checkIn}
                          onChange={(e) => setBookingDetails({...bookingDetails, checkIn: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out Date *
                        </label>
                        <input
                          type="date"
                          value={bookingDetails.checkOut}
                          onChange={(e) => setBookingDetails({...bookingDetails, checkOut: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min={bookingDetails.checkIn || new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adults *
                        </label>
                        <select
                          value={bookingDetails.adults}
                          onChange={(e) => setBookingDetails({...bookingDetails, adults: parseInt(e.target.value)})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          {[1,2,3,4].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'adult' : 'adults'}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Children
                        </label>
                        <select
                          value={bookingDetails.children}
                          onChange={(e) => setBookingDetails({...bookingDetails, children: parseInt(e.target.value)})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          {[0,1,2,3].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'child' : 'children'}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rooms *
                        </label>
                        <select
                          value={bookingDetails.rooms}
                          onChange={(e) => setBookingDetails({...bookingDetails, rooms: parseInt(e.target.value)})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          {[1,2,3,4].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'room' : 'rooms'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Guest Information</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={bookingDetails.guestName}
                          onChange={(e) => setBookingDetails({...bookingDetails, guestName: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          placeholder="30"
                          value={bookingDetails.guestAge}
                          onChange={(e) => setBookingDetails({...bookingDetails, guestAge: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="18"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        placeholder="Any special requirements or requests? (e.g., early check-in, dietary restrictions, room location preference)"
                        value={bookingDetails.specialRequests}
                        onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Additional Services</h3>
                    <div className="space-y-4">
                      <label className="flex items-start p-4 border rounded-lg hover:bg-blue-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bookingDetails.foodService}
                          onChange={(e) => setBookingDetails({...bookingDetails, foodService: e.target.checked})}
                          className="mr-3 mt-1"
                        />
                        <div>
                          <div className="font-bold">Food Service Package</div>
                          <div className="text-gray-600 text-sm">Breakfast + Dinner buffet, $50 per night</div>
                        </div>
                      </label>

                      <label className="flex items-start p-4 border rounded-lg hover:bg-blue-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bookingDetails.spaService}
                          onChange={(e) => setBookingDetails({...bookingDetails, spaService: e.target.checked})}
                          className="mr-3 mt-1"
                        />
                        <div>
                          <div className="font-bold">Luxury Spa Package</div>
                          <div className="text-gray-600 text-sm">Full-body massage & sauna access, $100 (one-time)</div>
                        </div>
                      </label>

                      <label className="flex items-start p-4 border rounded-lg hover:bg-blue-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bookingDetails.airportPickup}
                          onChange={(e) => setBookingDetails({...bookingDetails, airportPickup: e.target.checked})}
                          className="mr-3 mt-1"
                        />
                        <div>
                          <div className="font-bold">Airport Pickup Service</div>
                          <div className="text-gray-600 text-sm">Private car transfer from airport, $75 (one-way)</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
                    <h4 className="font-bold text-lg mb-4">Price Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room ({bookingDetails.rooms} x ${selectedRoom.price}/night):</span>
                        <span>${selectedRoom.price * bookingDetails.rooms}</span>
                      </div>
                      {bookingDetails.foodService && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Food Service:</span>
                          <span>$50</span>
                        </div>
                      )}
                      {bookingDetails.spaService && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spa Package:</span>
                          <span>$100</span>
                        </div>
                      )}
                      {bookingDetails.airportPickup && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Airport Pickup:</span>
                          <span>$75</span>
                        </div>
                      )}
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-blue-600">${calculateTotal()}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          *Taxes and service charges will be calculated at checkout
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleBookNow}
                      className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors text-lg"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}