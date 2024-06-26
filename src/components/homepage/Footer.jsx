import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">الشركة</h5>
            <a className="btn btn-link text-white-50" href="">معلومات عنا</a>
            <a className="btn btn-link text-white-50" href="">اتصل بنا</a>
            <a className="btn btn-link text-white-50" href="">خدماتنا</a>
            <a className="btn btn-link text-white-50" href="">سياسة الخصوصية</a>
            <a className="btn btn-link text-white-50" href="">الشروط والأحكام</a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">روابط سريعة</h5>
            <a className="btn btn-link text-white-50" href="">معلومات عنا</a>
            <a className="btn btn-link text-white-50" href="">اتصل بنا</a>
            <a className="btn btn-link text-white-50" href="">خدماتنا</a>
            <a className="btn btn-link text-white-50" href="">سياسة الخصوصية</a>
            <a className="btn btn-link text-white-50" href="">الشروط والأحكام</a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">الاتصال</h5>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>عمارة الريان</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">النشرة الإخبارية</h5>
            <p>اشترك معنا ليصلك الجديد </p>
            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
              <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="بريدك الإلكتروني" />
              <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">اشترك</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#"></a>، جميع الحقوق محفوظة.
              <br />
       
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="">الصفحة الرئيسية</a>
                <a href="">الكوكيز</a>
                <a href="">المساعدة</a>
                <a href="">الأسئلة الشائعة</a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
