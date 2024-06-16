import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import HomePage from './components/homepage/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
