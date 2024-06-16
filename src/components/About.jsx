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
              <h1 className="mb-4">Welcome to ScolTender</h1>
              <p className="mb-4">ScolTender is an online marketplace connecting establishments looking to procure goods or services with contractors who can fulfill their needs. Establishments can post purchase opportunities, specifying what they need for their company or school, while contractors can browse these opportunities and submit competitive bids to win the contracts.</p>
              <ul className="list-unstyled">
                <li><i className="fa fa-check text-primary me-2"></i> Establishments can easily post their procurement needs.</li>
                <li><i className="fa fa-check text-primary me-2"></i> Contractors can browse and bid on posted opportunities.</li>
                <li><i className="fa fa-check text-primary me-2"></i> Streamlined process from opportunity posting to contract award.</li>
              </ul>
              <a className="btn btn-primary py-3 px-5 mt-3" href="/">Explore Opportunities</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
