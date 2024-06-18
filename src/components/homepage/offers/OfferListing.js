import React, { useEffect, useState } from 'react';
import OfferItem from './OfferItem';
import OfferTab from '../OfferTab';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { auth, firestore } from '../../../services/firebase';

const OfferListing = () => {
  const [activeTab, setActiveTab] = useState('tab-1');
  const [opportunities, setOpportunities] = useState([]);
  const [endedOpportunities, setEndedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const opportunitiesSnapshot = await getDocs(collection(firestore, 'opportunities'));
        const opportunitiesList = await Promise.all(opportunitiesSnapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          const userDocRef = doc(firestore, 'users', data.createdBy);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.exists() ? userDoc.data() : null;
          const isEnded = new Date() > data.endDate.toDate();
          
          let lowestBid = null;
          if (isEnded) {
            const bidsQuery = query(
              collection(firestore, 'bids'),
              where('offerId', '==', docSnapshot.id),
              orderBy('amount', 'asc'),
              limit(1)
            );
            const bidsSnapshot = await getDocs(bidsQuery);
            if (!bidsSnapshot.empty) {
              lowestBid = bidsSnapshot.docs[0].data();
            }
          }

          return {
            id: docSnapshot.id,
            ...data,
            endDate: data.endDate.toDate(),
            createdBy: {
              profilePicture: userData ? userData.profilePicture : 'default-profile-pic-url',
              ...userData,
            },
            lowestBid
          };
        }));
        const ended = opportunitiesList.filter(opportunity => new Date() > opportunity.endDate);
        const active = opportunitiesList.filter(opportunity => new Date() <= opportunity.endDate);

        setOpportunities(active);
        setEndedOpportunities(ended);
      } catch (error) {
        console.error("Error fetching opportunities: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return <div>جارٍ التحميل...</div>;
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">قائمة العروض</h1>
        <OfferTab activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="tab-content">
          <div id="tab-1" className={`tab-pane fade show p-0 ${activeTab === 'tab-1' ? 'active' : ''}`}>
            {opportunities.length > 0 ? (
              opportunities.map(opportunity => (
                <OfferItem key={opportunity.id} offer={opportunity} />
              ))
            ) : (
              <p>لم يتم العثور على فرص نشطة.</p>
            )}
          </div>
          <div id="tab-2" className={`tab-pane fade show p-0 ${activeTab === 'tab-2' ? 'active' : ''}`}>
            {endedOpportunities.length > 0 ? (
              endedOpportunities.map(opportunity => (
                <OfferItem key={opportunity.id} offer={opportunity} />
              ))
            ) : (
              <p>لم يتم العثور على فرص منتهية.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferListing;
