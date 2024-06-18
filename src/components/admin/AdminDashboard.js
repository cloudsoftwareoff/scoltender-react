import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../services/firebase";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        const verifiedList = [];
        const unverifiedList = [];
        
        usersSnapshot.docs.forEach((doc) => {
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

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(firestore, "users", userId));
      setVerifiedUsers(verifiedUsers.filter((user) => user.id !== userId));
      setUnverifiedUsers(unverifiedUsers.filter((user) => user.id !== userId));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  if (loading) {
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
              <th>Actions</th>
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
                <td>
                  {isUnverified && (
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleVerifyUser(user.id)}
                    >
                      Verify
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowModal(user)}
                  >
                    Delete
                  </button>
                </td>
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

      {showModal && (
        <div className="modal show" style={{ display: "block" }} aria-modal="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete {selectedUser?.name}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(selectedUser.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
