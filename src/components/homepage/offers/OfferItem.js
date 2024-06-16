import React from 'react';

const OfferItem = ({ offer }) => {
  return (
    <div className="job-item p-4 mb-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-8 d-flex align-items-center">
          <img className="flex-shrink-0 img-fluid border rounded" src={offer.createdBy.profileImageUrl} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="text-start ps-4">
            <h5 className="mb-3">{offer.title}</h5>
            <span className="text-truncate me-3"><i className="far fa-list text-primary me-2"></i>{offer.description}</span>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
          <div className="d-flex mb-3">
            <a className="btn btn-light btn-square me-3" href="/"><i className="far fa-heart text-primary"></i></a>
            <a className="btn btn-primary" href="/">Apply Now</a>
          </div>
          <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date Line: {offer.endDate.toLocaleDateString()}</small>
        </div>
      </div>
    </div>
  );
}

export default OfferItem;
