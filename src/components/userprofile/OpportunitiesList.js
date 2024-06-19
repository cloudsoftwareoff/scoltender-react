import React from 'react';

const OpportunitiesList = ({ opportunities }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="card" style={{ textAlign: 'right' }}>
      <div className="card-header">
        <h3>الفرص</h3>
      </div>
      <ul className="list-group list-group-flush">
        {opportunities.map(opportunity => (
          <li key={opportunity.id} className="list-group-item">
            <h5>{opportunity.title}</h5>
            <p>{opportunity.description}</p>
            <p><strong>الميزانية:</strong> ${opportunity.budget}</p>
            <p><strong>تاريخ الانتهاء:</strong> {formatTimestamp(opportunity.endDate)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpportunitiesList;
