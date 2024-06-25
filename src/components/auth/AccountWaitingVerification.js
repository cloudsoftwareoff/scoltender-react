import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
const AccountWaitingVerification = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div className="container mt-5" style={{ textAlign: 'right' }}>
      <h1 className="text-center mb-4">تأكيد الحساب</h1>
      <div className="alert alert-info text-center">
        حسابك ينتظر التحقق.
      
      </div>
      <div className="text-center mt-4">
      <button className="btn btn-danger" onClick={handleLogout}>تسجيل الخروج</button>
      </div>
    </div>
  );
};

export default AccountWaitingVerification;
