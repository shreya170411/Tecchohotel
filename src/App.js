import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import Header from './components/Header';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Checkout from './pages/Checkout';
import BookingHistory from './pages/BookingHistory';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Use useAuth hook instead of AuthContext
  
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
          
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/room/:id" element={<RoomDetail />} />
              
              {/* Protected Routes (require login) */}
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute>
                    <BookingHistory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Simple Footer */}
          <footer className="bg-gray-800 text-white py-4 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} TecchoHotel. All rights reserved. 
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;