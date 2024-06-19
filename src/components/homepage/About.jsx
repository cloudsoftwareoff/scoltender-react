import React from 'react';

const About = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Left Section with Images */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/women_pc.jpg" alt="About 1" />
              </div>
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/deal1.jpg" alt="About 2" />
              </div>
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/deal_3.jpg" alt="About 3" />
              </div>
              <div className="col-6">
                <img className="img-fluid rounded" src="./img/women_happy.jpg" alt="About 4" />
              </div>
            </div>
          </div>

          {/* Right Section with Text */}
          <div className="col-lg-6">
            <div className="about-content">
              <h1 className="mb-4">مرحبًا بكم في ScolTender</h1>
              <p className="mb-4">ScolTender هو سوق إلكتروني يربط المؤسسات التي تسعى لشراء سلع أو خدمات مع المتعاقدين الذين يمكنهم تلبية احتياجاتهم. يمكن للمؤسسات نشر فرص الشراء، مع تحديد ما يحتاجونه لشركتهم أو مدرستهم، بينما يمكن للمتعاقدين تصفح هذه الفرص وتقديم عروض تنافسية للفوز بالعقود.</p>
              <ul className="list-unstyled">
                <li><i className="fa fa-check text-primary me-2"></i> يمكن للمؤسسات نشر احتياجاتها من المشتريات بسهولة.</li>
                <li><i className="fa fa-check text-primary me-2"></i> يمكن للمتعاقدين تصفح الفرص المنشورة وتقديم العطاءات.</li>
                <li><i className="fa fa-check text-primary me-2"></i> عملية مبسطة من نشر الفرص إلى منح العقود.</li>
              </ul>
              {/* <a className="btn btn-primary py-3 px-5 mt-3" href="/">استكشاف الفرص</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
