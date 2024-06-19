import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../services/firebase";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            if (userDoc.exists() && userDoc.data().isAdmin) {
              setIsAdmin(true);
            } else {
              navigate("/login");
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      });

      return unsubscribe;
    };

    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        const verifiedList = [];
        const unverifiedList = [];

        usersSnapshot.forEach((doc) => {
          const userData = {
            id: doc.id,
            ...doc.data(),
          };
          if (userData.isVerified) {
            verifiedList.push(userData);
          } else {
            unverifiedList.push(userData);
          }
        });

        setVerifiedUsers(verifiedList);
        setUnverifiedUsers(unverifiedList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = checkAdmin();

    if (isAdmin) {
      fetchUsers();
    }

    return () => unsubscribe();
  }, [isAdmin, navigate]);

  const handleVerifyUser = async (userId) => {
    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { isVerified: true });
      const updatedUser = unverifiedUsers.find((user) => user.id === userId);
      setVerifiedUsers([...verifiedUsers, { ...updatedUser, isVerified: true }]);
      setUnverifiedUsers(unverifiedUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  const renderUserTable = (users, title, isUnverified = false) => (
    <>
      <h2 className="text-center mb-4">{title}</h2>
      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {isUnverified && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.profileImageUrl}
                    className="rounded-circle admin-profile-image"
                    alt="Profile"
                  />
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {isUnverified && (
                  <td>
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleVerifyUser(user.id)}
                    >
                      Verify
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users available</p>
      )}
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      {renderUserTable(verifiedUsers, "Verified Users")}
      {renderUserTable(unverifiedUsers, "Unverified Users", true)}
    </div>
  );
};

export default AdminDashboard;
