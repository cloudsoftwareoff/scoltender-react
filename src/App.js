import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Dashboard from './components/userprofile/Dashboard';
import HomePage from './components/homepage/HomePage';
import DocumentUpload from './components/auth/DocumentUpload';
import AccountWaitingVerification from './components/auth/AccountWaitingVerification';
import BiddersPage from './components/homepage/offers/BidderPage';
import AdminDashboard from './components/admin/AdminDashboard';
import NotFound from './components/NotFound';
import About from './components/homepage/About';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<AccountWaitingVerification />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/bidders/:offerId" element={<BiddersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
