// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Navbar from './NavBar';
import Header from './Header';
import Category from '../Category';
import OfferListing from './offers/OfferListing';
import Statistics from './Statistics';
import '../../index.css'
import Footer from './Footer';
const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Statistics/>
      <About/>
      <OfferListing/>
      <Footer siteName={"ScolTender"} />
    </div>
  );
};

export default HomePage;
