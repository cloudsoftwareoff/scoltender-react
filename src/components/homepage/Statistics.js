import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../services/firebase';
import WOW from 'wowjs';

const Statistics = () => {
  const [contractorCount, setContractorCount] = useState(0);
  const [establishmentCount, setEstablishmentCount] = useState(0);
  const [opportunityCount, setOpportunityCount] = useState(0);
  const [bidCount, setBidCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        let contractors = 0;
        let establishments = 0;
        usersSnapshot.forEach(doc => {
          const data = doc.data();
          if (data.role === 'contractor') contractors++;
          if (data.role === 'establishment') establishments++;
        });
        setContractorCount(contractors);
        setEstablishmentCount(establishments);

        const opportunitiesSnapshot = await getDocs(collection(firestore, 'opportunities'));
        setOpportunityCount(opportunitiesSnapshot.size);

        const bidsSnapshot = await getDocs(collection(firestore, 'bids'));
        setBidCount(bidsSnapshot.size);

        // Call WOW.js sync method after data is loaded
        new WOW.WOW().sync();
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    new WOW.WOW().init();
    fetchCounts();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">الإحصائيات</h1>
        <div className="row g-4 mt-5">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="cat-item rounded p-4">
              <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
              <h6 className="mb-3">المقاولون</h6>
              <p className="mb-0">{contractorCount}</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="cat-item rounded p-4">
              <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
              <h6 className="mb-3">المؤسسات</h6>
              <p className="mb-0">{establishmentCount}</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="cat-item rounded p-4">
              <i className="fa fa-3x fa-tasks text-primary mb-4"></i>
              <h6 className="mb-3">الفرص</h6>
              <p className="mb-0">{opportunityCount}</p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="cat-item rounded p-4">
              <i className="fa fa-3x fa-chart-line text-primary mb-4"></i>
              <h6 className="mb-3">العطاءات</h6>
              <p className="mb-0">{bidCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
