import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import AddOpportunity from './AddOpportunity';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImageUrl: '',
  });
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setFormData(userDoc.data());
          fetchOpportunities();
        }
      } else {
        navigate('/login');
      }
    });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(firestore, 'users', user.uid), formData);
      setUserData(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
          <div className="card text-center">
            <div className="card-body">
              <img
                src={userData.profileImageUrl}
                className="rounded-circle mb-3"
                alt="Profile"
                style={{ width: '150px', height: '150px' }}
              />
              {editMode ? (
                <form onSubmit={handleEditProfile}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="profileImageUrl"
                      className="form-control"
                      value={formData.profileImageUrl}
                      onChange={handleInputChange}
                      placeholder="Profile Image URL"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
              ) : (
                <>
                  <h5 className="card-title">{userData.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Role: {userData.role}</h6>
                  <p className="card-text"><strong>Email:</strong> {userData.email}</p>
                  <p className="card-text"><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                  <p className="card-text"><strong>Registered At:</strong> {new Date(userData.registeredAt).toLocaleDateString()}</p>
                  <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
        <AddOpportunity />
          <div className="card">
            <div className="card-header">
              <h3>Opportunities</h3>
            </div>
            <ul className="list-group list-group-flush">
              {opportunities.map(opportunity => (
                <li key={opportunity.id} className="list-group-item">
                  <h5>{opportunity.title}</h5>
                  <p>{opportunity.description}</p>
                  <p><strong>Budget:</strong> ${opportunity.budget}</p>
                  <p><strong>End Date:</strong> {new Date(opportunity.endDate.seconds * 1000).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
