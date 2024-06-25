import React from 'react';

const BidsList = ({ bids }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="card" style={{ direction: 'rtl' }}>
      <div className="card-header">
        <h3>عروضك</h3>
      </div>
      <ul className="list-group list-group-flush">
        {bids.map(bid => (
          <li key={bid.id} className="list-group-item">
            <h5>الفرصة: {bid.opportunity.title}</h5>
            <p><strong>المبلغ:</strong> د {bid.amount}</p>
            <p><strong>التاريخ:</strong> {formatTimestamp(bid.timestamp)}</p>
            <p><strong>الوصف:</strong> {bid.opportunity.description}</p>
          
            <p><strong>تاريخ الانتهاء:</strong> {formatTimestamp(bid.opportunity.endDate)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidsList;
