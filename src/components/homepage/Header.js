
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Header = () => {
  return (
    <div className="container-xxl py-5 bg-dark page-header mb-5">
      <div className="container my-5 pt-5 pb-4">
        <h1 className="display-3 text-white mb-3 animated slideInDown">
      <b>  مرحبا بك في 
        scoltender
        </b>
          </h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-uppercase">
            
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Header;
