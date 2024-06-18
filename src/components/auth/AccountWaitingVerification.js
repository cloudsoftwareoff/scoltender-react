
import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountWaitingVerification = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Account Verification</h1>
      <div className="alert alert-info text-center">
        Your account is waiting to be verified. You will receive an email once your account has been verified.
      </div>
      <div className="text-center mt-4">
        <Link to="/login">
          <Button variant="contained" color="primary">Go to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default AccountWaitingVerification;
