import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { ToastContainer } from 'react-toastify'; // Import CSS
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

import LandingPage from './pages/LandingPage'; // Add Landing
import Login from './pages/Login';
import Register from './pages/Register';
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <SocketProvider>
      <Router>
        {/* Global Toast Container */}
        <ToastContainer position="top-center" autoClose={3000} />
        
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Changed from Login to Landing */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rider" element={<RiderDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;