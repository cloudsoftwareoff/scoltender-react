
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Header = () => {
  return (
    <div className="container-xxl py-5 bg-dark page-header mb-5">
      <div className="container my-5 pt-5 pb-4">
        <h1 className="display-3 text-white mb-3 animated slideInDown">ربط الاحتياجات بالحلول</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-uppercase">
            <li className="breadcrumb-item"><a href="/">انشر</a></li>
            <li className="breadcrumb-item"><a href="/">قدم عرضًا</a></li>
            <li className="breadcrumb-item text-white active" aria-current="page">افز</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Header;
