import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    notifications: true,
    newsletter: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.notifications}
                        onChange={(e) => setProfile({...profile, notifications: e.target.checked})}
                        className="mr-3"
                      />
                      Receive booking notifications
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.newsletter}
                        onChange={(e) => setProfile({...profile, newsletter: e.target.checked})}
                        className="mr-3"
                      />
                      Subscribe to newsletter
                    </label>
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Column - Account Info */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-bold mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="font-bold">January 2024</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Loyalty Points</div>
                  <div className="font-bold text-blue-600">1,250 Points</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tier Status</div>
                  <div className="font-bold">Silver Member</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl shadow-md p-6">
              <h3 className="font-bold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact our customer support for any questions about your account.
              </p>
              <button className="text-blue-600 font-bold">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}