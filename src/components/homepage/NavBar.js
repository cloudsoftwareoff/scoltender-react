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
        <h1 className="m-0 text-primary">سكول تندر</h1>
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
            الرئيسية
          </Link>
          <Link to="/about" className="nav-item nav-link">
            عن الموقع
          </Link>
          <Link to="/contact" className="nav-item nav-link">
            اتصل بنا
          </Link>
        </div>
        {isLoggedIn ? (
          <Link to="/home" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
            الحساب <i className="fa fa-person ms-3"></i>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
            تسجيل الدخول <i className="fa fa-arrow-right ms-3"></i>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
