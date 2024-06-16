// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import About from '../About';
import Navbar from './NavBar';
import Header from './Header';
import Category from '../Category';
import OfferListing from './offers/OfferListing';
import Statistics from './Statistics';
import '../../index.css'
const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Statistics/>
      <About/>
      <OfferListing/>
      {/* <header className="navbar navbar-expand-lg bg-light navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
          <img src="/logo.png" alt="Logo" style={{ width: '45px' }} />
          <h1 className="m-0 text-dark">Scoltender</h1>
        </Link>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div className="navbar-nav ml-auto py-0">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link to="/jobs" className="nav-item nav-link">Jobs</Link>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
            <Link to="/login" className="nav-item nav-link">Login</Link>
          </div>
        </div>
      </header>

      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white">Find Your Dream Job</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-4">
              <div className="d-flex flex-column h-100 p-5 bg-light rounded">
                <h4 className="mb-4">Job Categories</h4>
                <Link to="/category" className="btn btn-link">Accounting</Link>
                <Link to="/category" className="btn btn-link">Marketing</Link>
                <Link to="/category" className="btn btn-link">Design</Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="row g-5">
            
                <div className="col-lg-4 col-md-6">
                  <div className="job-item p-4 mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <img className="img-fluid rounded" src="/img/com-logo-1.jpg" alt="" style={{ width: '50px' }} />
                      <div className="text-start ps-3">
                        <h5 className="mb-0">Software Engineer</h5>
                        <span>Company Name</span>
                      </div>
                    </div>
                    <span className="badge bg-primary mb-3">Full Time</span>
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
         
              </div>
            </div>
          </div>
        </div>
      </div>
      <About/> */}
    </div>
  );
};

export default HomePage;
