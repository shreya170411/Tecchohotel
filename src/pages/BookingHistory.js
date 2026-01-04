import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function BookingHistory() {
  const { user, getUserBookings, updateBookingStatus } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  useEffect(() => {
    if (user) {
      const userBookings = getUserBookings();
      setBookings(userBookings);
    }
  }, [user, getUserBookings]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Checked-in': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed': return '✅';
      case 'Completed': return '🏁';
      case 'Upcoming': return '📅';
      case 'Cancelled': return '❌';
      case 'Checked-in': return '🏨';
      default: return '📋';
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus(bookingId, 'Cancelled');
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
      );
      setBookings(updatedBookings);
      alert('Booking cancelled successfully!');
    }
  };

  const handleCheckIn = (bookingId) => {
    updateBookingStatus(bookingId, 'Checked-in');
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'Checked-in' } : booking
    );
    setBookings(updatedBookings);
    alert('Checked in successfully! Enjoy your stay.');
  };

  const calculateNights = (checkIn, checkOut) => {
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    return nights;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your booking history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Booking History</h1>
            <p className="text-gray-600">Welcome back, {user.name}! Here's your booking history.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-bold">{user.joinDate}</div>
            </div>
          </div>
        </div>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start your journey with us!</p>
            <a 
              href="/rooms" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              Book Your First Stay
            </a>
          </div>
        ) : (
          <>
            {/* Booking Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
                <div className="text-gray-600">Total Bookings</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-green-600">
                  {bookings.filter(b => b.status === 'Completed' || b.status === 'Checked-in').length}
                </div>
                <div className="text-gray-600">Completed Stays</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-yellow-600">
                  {bookings.filter(b => b.status === 'Upcoming').length}
                </div>
                <div className="text-gray-600">Upcoming Stays</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold">
                  ${bookings.reduce((sum, booking) => sum + parseFloat(booking.total || 0), 0).toFixed(2)}
                </div>
                <div className="text-gray-600">Total Spent</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Action</span>
                    <span className="font-bold">Date</span>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[...bookings]
                    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
                    .slice(0, 5)
                    .map(booking => (
                      <div key={booking.id} className="p-4 border-b hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="mr-3">{getStatusIcon(booking.status)}</span>
                            <div>
                              <div className="font-medium">Booked {booking.room.name}</div>
                              <div className="text-sm text-gray-500">Booking #{booking.bookingNumber}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div>{booking.bookingDate}</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* All Bookings */}
            <div>
              <h2 className="text-xl font-bold mb-4">All Bookings</h2>
              <div className="space-y-6">
                {bookings
                  .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
                  .map(booking => (
                  <div key={booking.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold">{booking.room.name}</h3>
                          <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)} {booking.status}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Booking #{booking.bookingNumber} • {booking.bookingDate}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-2xl font-bold">${parseFloat(booking.total || 0).toFixed(2)}</div>
                        <div className="text-sm text-gray-500">
                          {booking.checkIn} to {booking.checkOut} • 
                          {calculateNights(booking.checkIn, booking.checkOut)} nights
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Check-in</div>
                        <div className="font-bold">{booking.checkIn}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Check-out</div>
                        <div className="font-bold">{booking.checkOut}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Guests</div>
                        <div className="font-bold">{booking.adults} adults, {booking.children} children</div>
                      </div>
                    </div>
                    
                    {booking.specialRequests && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-500">Special Requests:</div>
                        <div className="font-medium">{booking.specialRequests}</div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3 justify-end mt-6">
                      <button 
                        onClick={() => setSelectedBooking(selectedBooking?.id === booking.id ? null : booking)}
                        className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2"
                      >
                        {selectedBooking?.id === booking.id ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {booking.status === 'Upcoming' && (
                        <>
                          <button 
                            onClick={() => handleCheckIn(booking.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
                          >
                            Check-in
                          </button>
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'Confirmed' && (
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    
                    {/* Expanded Details */}
                    {selectedBooking?.id === booking.id && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold mb-3">Booking Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Primary Guest</div>
                            <div className="font-medium">{booking.guestName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Contact Email</div>
                            <div className="font-medium">{booking.guestEmail}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Rooms Booked</div>
                            <div className="font-medium">{booking.rooms} room(s)</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Payment Method</div>
                            <div className="font-medium">{booking.paymentMethod} •••• {booking.paymentLastFour}</div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-sm text-gray-500">Additional Services</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {booking.foodService && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Food Service</span>}
                              {booking.spaService && <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Spa Package</span>}
                              {booking.airportPickup && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Airport Pickup</span>}
                              {!booking.foodService && !booking.spaService && !booking.airportPickup && 
                                <span className="text-gray-500 text-sm">No additional services</span>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}