import React, { useEffect } from 'react';
import $ from 'jquery';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

const OwlCarouselComponent = () => {
  useEffect(() => {
    // Ensure owlCarousel is properly registered with jQuery
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
    script.async = true;
    script.onload = () => {
      $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 1500,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
      });
    };
    document.body.appendChild(script);
  }, []);

  const items = [
    {
      img: 'img/carousel-1.jpg',
      title: 'Find The Perfect Job That You Deserved',
      description: 'Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.',
      btn1: 'Search A Job',
      btn2: 'Find A Talent'
    },
    {
      img: 'img/carousel-2.jpg',
      title: 'Find The Best Startup Job That Fit You',
      description: 'Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea elitr.',
      btn1: 'Search A Job',
      btn2: 'Find A Talent'
    }
  ];

  return (
    <div className="container-fluid p-0">
      <div className="owl-carousel header-carousel position-relative">
        {items.map((item, index) => (
          <div className="owl-carousel-item position-relative" key={index}>
            <img className="img-fluid" src={item.img} alt="" />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(43, 57, 64, .5)' }}>
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h1 className="display-3 text-white animated slideInDown mb-4">{item.title}</h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">{item.description}</p>
                    <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">{item.btn1}</a>
                    <a href="/" className="btn btn-secondary py-md-3 px-md-5 animated slideInRight">{item.btn2}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwlCarouselComponent;
