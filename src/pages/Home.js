import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWifi, faSwimmingPool, faUtensils, faSpa, 
  faDumbbell, faCar, faConciergeBell, faShieldAlt,
  faCalendarCheck, faCreditCard, faHeadset, faStar,
  faPhone, faEnvelope, faMapMarkerAlt, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const services = [
    { icon: faWifi, title: "Free High-Speed WiFi", desc: "Stay connected with complimentary high-speed internet" },
    { icon: faSwimmingPool, title: "Swimming Pool", desc: "Outdoor and indoor pools with temperature control" },
    { icon: faUtensils, title: "Fine Dining", desc: "5-star restaurants with international cuisine" },
    { icon: faSpa, title: "Luxury Spa", desc: "Full-service spa and wellness center" },
    { icon: faDumbbell, title: "Fitness Center", desc: "24/7 gym with personal trainers available" },
    { icon: faCar, title: "Valet Parking", desc: "Complimentary valet parking for all guests" },
    { icon: faConciergeBell, title: "24/7 Concierge", desc: "Round-the-clock concierge service" },
    { icon: faShieldAlt, title: "Security", desc: "24-hour security and CCTV surveillance" }
  ];

  const bookingSteps = [
    { number: "1", title: "Choose Your Room", desc: "Browse our luxurious rooms and suites" },
    { number: "2", title: "Select Dates & Guests", desc: "Pick your dates and number of guests" },
    { number: "3", title: "Add Services", desc: "Customize with spa, dining, and other services" },
    { number: "4", title: "Confirm & Pay", desc: "Secure payment with instant confirmation" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", stay: "Deluxe Suite", text: "Best hotel experience ever! The service was impeccable." },
    { name: "Michael Chen", stay: "Business Suite", text: "Perfect for business travelers. Facilities are top-notch." },
    { name: "Priya Sharma", stay: "Family Room", text: "Our kids loved the pool! Family-friendly and comfortable." }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-blue-400">TecchoHotel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Experience luxury redefined at our 5-star hotel where comfort meets elegance
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/rooms"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Your Stay Now
            </Link>
            <a 
              href="#about"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose <span className="text-blue-600">TecchoHotel</span>?</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We combine luxury, comfort, and technology to create the perfect stay experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Award-Winning Service</h3>
              <p className="text-gray-600">
                Recipient of the "Best Luxury Hotel 2023" award with 98% guest satisfaction rate.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-3">Prime Location</h3>
              <p className="text-gray-600">
                Situated in the heart of the city, minutes from business districts and attractions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We guarantee the best rates. Found cheaper? We'll match it plus 10% off.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Luxury Rooms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">15</div>
              <div className="text-gray-600">Restaurants & Bars</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Guest Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How to Book in 4 Easy Steps</h2>
            <p className="text-gray-600 text-lg">Your journey to luxury begins here</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg h-full">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {index < bookingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="text-blue-400 text-2xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/rooms"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              Start Booking Process
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-gray-600 text-lg">Everything you need for a perfect stay</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-blue-600 text-2xl mb-4 group-hover:text-blue-700">
                  {service.title === "Free High-Speed WiFi" && "📶"}
                  {service.title === "Swimming Pool" && "🏊"}
                  {service.title === "Fine Dining" && "🍽️"}
                  {service.title === "Luxury Spa" && "💆"}
                  {service.title === "Fitness Center" && "💪"}
                  {service.title === "Valet Parking" && "🚗"}
                  {service.title === "24/7 Concierge" && "🛎️"}
                  {service.title === "Security" && "🛡️"}
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star}>⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">Stayed in {testimonial.stay}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-blue-200">We're here to help 24/7</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-blue-200">1-800-TECCHO-HOTEL</p>
              <p className="text-sm text-blue-300">(1-800-832-246-6835)</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-blue-200">reservations@tecchohotel.com</p>
              <p className="text-blue-200">support@tecchohotel.com</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-blue-200">123 Luxury Avenue</p>
              <p className="text-blue-200">Business District, City 10001</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Need Help Booking?</h3>
            <p className="text-center text-blue-200 mb-6">
              Our booking specialists are available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/rooms"
                className="bg-white text-blue-900 hover:bg-blue-100 px-6 py-3 rounded-lg font-bold transition-all duration-300"
              >
                Book Online Now
              </Link>
              <button 
                onClick={() => alert('Calling 1-800-TECCHO-HOTEL...')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TecchoHotel</h3>
              <p className="text-gray-400">
                Luxury redefined. Comfort perfected. Experience the difference.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/rooms" className="text-gray-400 hover:text-white">Rooms & Suites</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">My Account</Link></li>
                <li><Link to="/checkout" className="text-gray-400 hover:text-white">Checkout</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cancellation Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer">
                  f
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer">
                  t
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer">
                  ig
                </div>
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 cursor-pointer">
                  in
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TecchoHotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}