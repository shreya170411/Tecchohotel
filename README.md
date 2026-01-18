#  **TecchoHotel - Hotel Booking Web Application**
This project is a complete hotel booking web application built as part of the InfoBharatInterns Web Development Internship Program. The application features a modern, responsive design with full booking functionality, user authentication, and a seamless user experience.

---

## 🌟 **Live Demo**
[Deployed on Vercel] - https://tecchohotel-internship.vercel.app

---

## 📋 **Project Overview**
TecchoHotel is a full-featured hotel booking platform that allows users to browse rooms, make reservations, and manage their bookings. The application is built with modern web technologies and follows industry best practices.

---

## 🎯 **Key Features:**
- User Authentication - Secure login and registration with JWT token handling
- Room Browsing - Browse available rooms with filters and sorting
- Booking System - Complete booking flow from selection to checkout
- Responsive Design - Fully responsive across mobile, tablet, and desktop
- Booking History - Users can view and manage their past bookings
- Payment Integration - Mock payment processing for booking completion
- Modern UI/UX - Clean, elegant interface with smooth animations

  ---

## 🛠️**Technologies Used:**
- React.js - Frontend framework
- Tailwind CSS - Styling framework
- Context API - State management
- React Router - Navigation and routing
- React Hook Form - Form handling with validation
- React Hot Toast - Toast notifications
- Framer Motion - Animations (optional)
  
## **Development Tools:**
- Create React App - Build tool
- Jest & React Testing Library - Testing framework
- Git & GitHub - Version control
- Vercel - Deployment platform

  ---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/tecchohotel-internship.git
cd tecchohotel-internship

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

## 📁 **Project Structure:**
tecchohotel/
- public/
   - index.html      -- Main HTML file
   - manifest.json    -- PWA manifest
   - favicon.ico     -- Website icon
   - robots.txt    -- SEO file
   - logo192.png    -- App icon
   - logo512.png    -- App icon
- src/
    - components/   -- Reusable UI components
       - Header.js   -- Navigation header
    - pages/         -- Page components
       - Home.js         -- Landing page
       - Login.js        -- Login page
       - Register.js     -- Registration page
       - Rooms.js        -- Room listing page
       - RoomDetail.js   -- Room details page
       - Checkout.js     -- Checkout page
       - BookingHistory.js -- Booking history
       - Profile.js      -- User profile
       - NotFound.js     -- 404 error page
    - context/            -- Context API for state
       - AuthContext.js  -- Authentication context
    - data/               -- Mock data
       - mockData.js     -- Sample rooms data
    - utils/             -- Utility functions (can be empty)
    - App.js            -- Main App component
    - App.test.js      -- Test file 1
    - Home.test.js     -- Test file 2
    - index.js          -- Entry point
    - index.css         -- Global styles
    - setupTests.js     -- Test setup
- .gitignore
- package-lock.js        -- Exact dependency versions
- package.json           -- Dependencies list
- README.md              -- Project documentation
- tailwind.config.js     -- Tailwind configuration
- postcss.config.js      -- Post CSS config