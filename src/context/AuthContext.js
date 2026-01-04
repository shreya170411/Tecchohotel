import { createContext, useState, useContext } from 'react';

// Create and export the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('tecchohotel_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(localStorage.getItem('tecchohotel_token'));

  // Get user's bookings from localStorage
  const getUserBookings = () => {
    if (!user) return [];
    const allBookings = JSON.parse(localStorage.getItem('tecchohotel_all_bookings') || '[]');
    return allBookings.filter(booking => booking.userEmail === user.email);
  };

  // Add a new booking to history
  const addBookingToHistory = (bookingData) => {
    if (!user) return;
    
    const allBookings = JSON.parse(localStorage.getItem('tecchohotel_all_bookings') || '[]');
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      userEmail: user.email,
      userName: user.name,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      bookingNumber: `BOOK-${Date.now().toString().slice(-8)}`
    };
    
    allBookings.push(newBooking);
    localStorage.setItem('tecchohotel_all_bookings', JSON.stringify(allBookings));
    return newBooking;
  };

  // Update booking status
  const updateBookingStatus = (bookingId, newStatus) => {
    const allBookings = JSON.parse(localStorage.getItem('tecchohotel_all_bookings') || '[]');
    const updatedBookings = allBookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    localStorage.setItem('tecchohotel_all_bookings', JSON.stringify(updatedBookings));
  };

  const login = (email, password) => {
    // Mock login - no real API
    const mockUser = { 
      id: Date.now(),
      name: email.split('@')[0],
      email: email,
      joinDate: new Date().toISOString().split('T')[0]
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('tecchohotel_token', mockToken);
    localStorage.setItem('tecchohotel_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setToken(mockToken);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    localStorage.removeItem('tecchohotel_token');
    localStorage.removeItem('tecchohotel_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout,
      getUserBookings,
      addBookingToHistory,
      updateBookingStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);