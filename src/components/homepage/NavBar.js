import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase'; 
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link to="/" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
        <h1 className="m-0 text-primary">ScolTender</h1>
      </Link>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          <Link to="/about" className="nav-item nav-link">
            About
          </Link>
          <div className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              Jobs
            </Link>
            <div className="dropdown-menu rounded-0 m-0">
              <Link to="/job-list" className="dropdown-item">
                Job List
              </Link>
              <Link to="/job-detail" className="dropdown-item">
                Job Detail
              </Link>
            </div>
          </div>
          <div className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              Pages
            </Link>
            <div className="dropdown-menu rounded-0 m-0">
              <Link to="/category" className="dropdown-item">
                Job Category
              </Link>
              <Link to="/testimonial" className="dropdown-item">
                Testimonial
              </Link>
              <Link to="/404" className="dropdown-item">
                404
              </Link>
            </div>
          </div>
          <Link to="/contact" className="nav-item nav-link">
            Contact
          </Link>
        </div>
        {isLoggedIn ? (
          <Link to="/home" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
            Account <i className="fa fa-arrow-right ms-3"></i>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
            Login <i className="fa fa-arrow-right ms-3"></i>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
