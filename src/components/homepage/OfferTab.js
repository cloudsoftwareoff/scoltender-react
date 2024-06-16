import React from 'react';

const OfferTab = ({ activeTab, handleTabChange }) => {
  return (
    <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
      <li className="nav-item">
        <a className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-1' ? 'active' : ''}`} onClick={() => handleTabChange('tab-1')} href="#tab-1">
          <h6 className="mt-n1 mb-0">Opportunities:</h6>
        </a>
      </li>
      <li className="nav-item">
    
      </li>
    </ul>
  );
}

export default OfferTab;
