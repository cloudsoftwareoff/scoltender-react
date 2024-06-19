import React from "react";

const Footer = ({ siteName }) => {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">الشركة</h5>
            <a className="btn btn-link text-white-50" href="/">
              حولنا
            </a>
            <a className="btn btn-link text-white-50" href="/">
              اتصل بنا
            </a>
            <a className="btn btn-link text-white-50" href="/">
              خدماتنا
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">الاتصال</h5>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3"></i>تونس
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>911
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>contact@cloudsoftware.tn
            </p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href="/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="/">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#">{siteName}</a>, كل الحقوق محفوظة. تصميم بواسطة{" "}
              <a className="border-bottom" href="https://cloudsoftware.tn">Cloud Software Inc.</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
