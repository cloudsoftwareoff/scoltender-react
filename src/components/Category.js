import React, { useEffect } from 'react';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const categories = [
  { icon: 'fa-mail-bulk', title: 'Marketing', vacancies: '123 Vacancy', delay: '0.1s' },
  { icon: 'fa-headset', title: 'Customer Service', vacancies: '123 Vacancy', delay: '0.3s' },
  { icon: 'fa-user-tie', title: 'Human Resource', vacancies: '123 Vacancy', delay: '0.5s' },
  { icon: 'fa-tasks', title: 'Project Management', vacancies: '123 Vacancy', delay: '0.7s' },
  { icon: 'fa-chart-line', title: 'Business Development', vacancies: '123 Vacancy', delay: '0.1s' },
  { icon: 'fa-hands-helping', title: 'Sales & Communication', vacancies: '123 Vacancy', delay: '0.3s' },
  { icon: 'fa-book-reader', title: 'Teaching & Education', vacancies: '123 Vacancy', delay: '0.5s' },
  { icon: 'fa-drafting-compass', title: 'Design & Creative', vacancies: '123 Vacancy', delay: '0.7s' },
];

const Category = () => {
  useEffect(() => {
    const WOW = require('wowjs');
    new WOW.WOW().init();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
       
        <div className="row g-4 mt-5">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={category.delay}>
              <a className="cat-item rounded p-4" href="/">
                <i className={`fa fa-3x ${category.icon} text-primary mb-4`}></i>
                <h6 className="mb-3">{category.title}</h6>
                <p className="mb-0">{category.vacancies}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
