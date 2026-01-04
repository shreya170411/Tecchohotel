import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { rooms } from '../data/mockData';

export default function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Find room by ID
    const foundRoom = rooms.find(r => r.id === parseInt(id));
    if (foundRoom) {
      setRoom(foundRoom);
      // Add more images for gallery
      setRoom({
        ...foundRoom,
        images: [
          foundRoom.image,
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400'
        ]
      });
    }
    setLoading(false);
  }, [id]);

  const amenitiesDetails = {
    'WiFi': { icon: '📶', desc: 'High-speed internet access' },
    'TV': { icon: '📺', desc: '55" Smart TV with streaming' },
    'AC': { icon: '❄️', desc: 'Climate control air conditioning' },
    'Breakfast': { icon: '🍳', desc: 'Complimentary breakfast buffet' },
    'Work Desk': { icon: '💼', desc: 'Ergonomic work desk' },
    'Kitchen': { icon: '👨‍🍳', desc: 'Fully equipped kitchenette' },
    '2 Beds': { icon: '🛏️', desc: 'Two queen-size beds' },
    'Balcony': { icon: '🌅', desc: 'Private balcony with view' },
    'Bathtub': { icon: '🛁', desc: 'Jacuzzi bathtub' },
    'Minibar': { icon: '🍷', desc: 'Stocked minibar' }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading room details...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4">Room Not Found</h2>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist.</p>
          <Link to="/rooms" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Browse All Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/rooms" className="hover:text-blue-600">Rooms</Link>
          <span className="mx-2">›</span>
          <span className="font-medium">{room.name}</span>
        </div>

        {/* Room Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{room.name}</h1>
            <p className="text-gray-600 mt-2">{room.description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-3xl font-bold text-blue-600">${room.price}<span className="text-lg text-gray-500">/night</span></div>
            <div className="text-sm text-gray-500">+ taxes & fees</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-96">
                <img 
                  src={room.images[selectedImage]} 
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {room.images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden h-44 ${selectedImage === index ? 'ring-4 ring-blue-500' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`${room.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Room Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Room Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-4">{amenitiesDetails[amenity]?.icon || '✅'}</span>
                    <div>
                      <h4 className="font-bold text-lg">{amenity}</h4>
                      <p className="text-gray-600">{amenitiesDetails[amenity]?.desc || 'Premium feature included'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Room Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">📏</div>
                  <div className="text-sm text-gray-500">Room Size</div>
                  <div className="font-bold">45 m²</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="text-sm text-gray-500">Max Guests</div>
                  <div className="font-bold">4 Persons</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">🛏️</div>
                  <div className="text-sm text-gray-500">Bed Type</div>
                  <div className="font-bold">King Size</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">🪟</div>
                  <div className="text-sm text-gray-500">View</div>
                  <div className="font-bold">City View</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Experience unparalleled luxury in our {room.name.toLowerCase()}. This beautifully appointed room offers 
                  a perfect blend of comfort and elegance, designed to make your stay memorable.
                </p>
                <p className="text-gray-700 mb-4">
                  Featuring floor-to-ceiling windows that offer stunning city views, premium bedding for a restful sleep, 
                  and a spacious en-suite bathroom with premium toiletries. The room is equipped with state-of-the-art 
                  technology including smart room controls and high-speed WiFi.
                </p>
                <p className="text-gray-700">
                  Perfect for both business and leisure travelers, this room provides the ideal sanctuary after a long day 
                  of meetings or sightseeing. Wake up to breathtaking views and enjoy our signature hospitality throughout 
                  your stay.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Book This Room</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per night</span>
                  <span className="font-bold">${room.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>$25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span>$15</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${room.price + 25 + 15}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/rooms"
                onClick={() => {
                  // Save this room to localStorage for quick booking
                  localStorage.setItem('tecchohotel_quick_book', JSON.stringify(room));
                }}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 mb-4"
              >
                Book Now
              </Link>

              <Link
                to="/rooms"
                className="block w-full bg-gray-100 text-gray-800 text-center py-3 rounded-lg font-bold hover:bg-gray-200"
              >
                View All Rooms
              </Link>

              {/* Quick Info */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-bold mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3">🕒</span>
                    <span>Check-in: 3:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3">🕒</span>
                    <span>Check-out: 11:00 AM</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3">🚭</span>
                    <span>Non-smoking room</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3">🐾</span>
                    <span>Pets not allowed</span>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">Our team is here to assist you 24/7</p>
                <button className="text-blue-600 font-bold text-sm">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}