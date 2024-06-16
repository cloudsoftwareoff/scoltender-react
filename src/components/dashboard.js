import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
          // Fetch opportunities
          fetchOpportunities();
        }
      } else {
        // Redirect to login if not logged in
        navigate('/login');
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const fetchOpportunities = async () => {
    const snapshot = await getDocs(collection(firestore, 'opportunities'));
    const opportunitiesList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setOpportunities(opportunitiesList);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h2>Your Role: {role}</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Opportunities:</h3>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id}>
            <h4>{opportunity.title}</h4>
            <p>{opportunity.description}</p>
            <p>Budget: ${opportunity.budget}</p>
            <p>End Date: {new Date(opportunity.endDate.seconds * 1000).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
