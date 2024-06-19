import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../services/firebase';

const ProfileCard = ({ userData, setUserData, handleLogout }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(userData);

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
      await updateDoc(doc(firestore, 'users', userData.uid), formData);
      setUserData(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="card text-center">
      <div className="card-body">
        <img
          src={userData.profileImageUrl}
          className="rounded-circle mb-3"
          alt="الملف الشخصي"
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
                placeholder="الاسم"
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
                placeholder="البريد الإلكتروني"
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
                placeholder="رقم الهاتف"
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
                placeholder="رابط صورة الملف الشخصي"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">حفظ</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>إلغاء</button>
          </form>
        ) : (
          <>
            <h5 className="card-title">{userData.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{userData.role}: الدور </h6>
            <p className="card-text"> {userData.email}:<strong>البريد الإلكتروني</strong></p>
            <p className="card-text"> {userData.phoneNumber}:<strong>رقم الهاتف</strong></p>
            <p className="card-text">{formatTimestamp(userData.registeredAt)}:<strong>تاريخ التسجيل</strong> </p>
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>تعديل الملف الشخصي</button>
            <button className="btn btn-danger" onClick={handleLogout}>تسجيل الخروج</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
