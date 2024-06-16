import React, { useEffect, useState } from 'react';
import OfferItem from './OfferItem';
import OfferTab from '../OfferTab';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../services/firebase';

const OfferListing = () => {
  const [activeTab, setActiveTab] = useState('tab-1'); 
  const [opportunities, setOpportunities] = useState([]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const opportunitiesSnapshot = await getDocs(collection(firestore, 'opportunities'));
        const opportunitiesList = await Promise.all(opportunitiesSnapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          const userDocRef = doc(firestore, 'users', data.createdBy);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.exists() ? userDoc.data() : null;
          return {
            id: docSnapshot.id,
            ...data,
            endDate: data.endDate.toDate(),
            createdBy: {
              profilePicture: userData ? userData.profilePicture : 'default-profile-pic-url', // Provide a default profile picture URL
              ...userData // Include other user data if necessary
            }
          };
        }));
        setOpportunities(opportunitiesList);
        console.log(opportunitiesList);
      } catch (error) {
        console.error("Error fetching opportunities: ", error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
        <OfferTab activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="tab-content">
          <div id="tab-1" className={`tab-pane fade show p-0 ${activeTab === 'tab-1' ? 'active' : ''}`}>
            {opportunities.map(opportunity => (
              <OfferItem key={opportunity.id} offer={opportunity} />
            ))}
            <a className="btn btn-primary py-3 px-5" href="/">Browse More Jobs</a>
          </div>
          {/* Repeat for tab-2 and tab-3 with respective opportunities data */}
        </div>
      </div>
    </div>
  );
}

export default OfferListing;
