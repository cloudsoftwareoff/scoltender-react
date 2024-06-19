import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { doc as firestoreDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import AddOpportunity from './AddOpportunity';
import ProfileCard from './ProfileCard';
import OpportunitiesList from './OpportunitiesList';
import BidsList from './BidsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountWaitingVerification from '../auth/AccountWaitingVerification';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(firestoreDoc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          if (userDoc.data().role === 'establishment') {
            fetchOpportunities(user.uid);
          } else if (userDoc.data().role === 'contractor') {
            fetchBids(user.uid);
          }
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchOpportunities = async (uid) => {
    const opportunitiesQuery = query(collection(firestore, 'opportunities'), where('createdBy', '==', uid));
    const snapshot = await getDocs(opportunitiesQuery);
    const opportunitiesList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setOpportunities(opportunitiesList);
  };

  const fetchBids = async (uid) => {
    const bidsQuery = query(collection(firestore, 'bids'), where('bidder', '==', uid));
    const snapshot = await getDocs(bidsQuery);
    const bidsList = await Promise.all(snapshot.docs.map(async (bidDoc) => {
      const bidData = bidDoc.data();
      const opportunityDoc = await getDoc(firestoreDoc(firestore, 'opportunities', bidData.offerId));
      const opportunityData = opportunityDoc.exists() ? opportunityDoc.data() : {};
      return {
        id: bidDoc.id,
        ...bidData,
        opportunity: opportunityData
      };
    }));
    setBids(bidsList);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-4">
          <ProfileCard userData={userData} setUserData={setUserData} handleLogout={handleLogout} />
        </div>
       
        <div className="col-md-8">
          {userData.role === 'establishment' ? (
            <>
        {   userData.isVerified !=null && userData.isVerified===true   ? 
        (
        <AddOpportunity fetchOpportunities={() => 
            fetchOpportunities(userData.uid !=null ? userData.uid : user.uid)} />)
            :
            <p><AccountWaitingVerification/></p>
            }
              <OpportunitiesList opportunities={opportunities} />
            </>
          ) : (
            <BidsList bids={bids} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;