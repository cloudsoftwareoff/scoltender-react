
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">الصفحة غير موجودة</h2>
      <p className="mb-4">
        عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة. يرجى التحقق من العنوان والمحاولة مرة أخرى.
      </p>
      <Link to="/">
        <button className="btn btn-primary">العودة إلى الصفحة الرئيسية</button>
      </Link>
    </div>
  );
};

export default NotFound;
