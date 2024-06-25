import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../services/firebase";
import './AdminDashboard.css';
import Navbar from "../homepage/NavBar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
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
        const userList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(userList);
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

  const handleVerifyUser = async (userId, verifyStatus) => {
    try {
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { isVerified: verifyStatus });

      setUsers(users.map(user =>
        user.id === userId ? { ...user, isVerified: verifyStatus } : user
      ));
    } catch (error) {
      console.error("Error updating user account:", error);
    }
  };

  if (!isAdmin) {
    return <div>تحميل...</div>;
  }

  return (
<div>
      <Navbar />
    <div className="container mt-5">
      <h1 className="text-center mb-4">لوحة إدارة النظام</h1>
      <h2 className="text-center mb-4">المستخدمين</h2>
      {loading ? (
        <p className="text-center">جاري التحميل...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الدور</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
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
                <td>{user.isVerified ? "مفعل" : "غير مفعل"}</td>
                <td>
                  {user.isVerified ? (
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handleVerifyUser(user.id, false)}
                    >
                      إلغاء التفعيل
                    </button>
                  ) : (
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleVerifyUser(user.id, true)}
                    >
                      تفعيل الحساب
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default AdminDashboard;
