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
      console.error("Error activating user account:", error);
    }
  };

  if (!isAdmin) {
    return <div>تحميل...</div>;
  }

  const renderUserTable = (users, title, isUnverified = false) => (
    <>
      <h2 className="text-center mb-4">{title}</h2>
      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الدور</th>
              {isUnverified && <th>الإجراءات</th>}
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
                      تفعيل الحساب
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">لا يوجد مستخدمين</p>
      )}
    </>
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">لوحة إدارة النظام</h1>
      {renderUserTable(verifiedUsers, "المستخدمين المفعّلين")}
      {renderUserTable(unverifiedUsers, "المستخدمين غير المفعّلين", true)}
    </div>
  );
};

export default AdminDashboard;
