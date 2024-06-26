import React from 'react';

const BidsList = ({ bids, onEditBid, onDeleteBid }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const isBeforeEndDate = (endDate) => {
    return new Date() <= new Date(endDate.seconds * 1000);
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
            {isBeforeEndDate(bid.opportunity.endDate) && (
              <>
                <button 
                  className="btn btn-warning me-2"
                  onClick={() => onEditBid(bid.id)}
                >
                  تعديل
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => onDeleteBid(bid.id)}
                >
                  حذف
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidsList;
