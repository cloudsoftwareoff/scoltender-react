import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountWaitingVerification = () => {
  return (
    <div className="container mt-5" style={{ textAlign: 'right' }}>
      <h1 className="text-center mb-4">تأكيد الحساب</h1>
      <div className="alert alert-info text-center">
        حسابك ينتظر التحقق.
      
      </div>
      <div className="text-center mt-4">
        {/* <Link to="/login">
          <Button variant="contained" color="primary">الذهاب إلى تسجيل الدخول</Button>
        </Link> */}
      </div>
    </div>
  );
};

export default AccountWaitingVerification;
