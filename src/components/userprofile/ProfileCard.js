import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore, storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileCard = ({ userData, setUserData, handleLogout }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(userData.profileImageUrl || '');

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
      // Update profile data
      await updateDoc(doc(firestore, 'users', userData.uid), formData);
      setUserData(formData);

      // If a new profile picture is selected, upload it
      if (selectedFile) {
        const photoRef = ref(storage, `profiles/${userData.uid}/${selectedFile.name}`);
        await uploadBytes(photoRef, selectedFile);
        const photoURL = await getDownloadURL(photoRef);
        setPhotoUrl(photoURL);
        setFormData({
          ...formData,
          profileImageUrl: photoURL,
        });
      }

      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
          src={photoUrl || 'default-profile-pic-url'}
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
              <label htmlFor="profilePic" className="form-label">اختر صورة الملف الشخصي</label>
              <input
                type="file"
                className="form-control"
                id="profilePic"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">حفظ</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>إلغاء</button>
          </form>
        ) : (
          <>
            <h5 className="card-title">{formData.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted"><strong>الدور :</strong> {userData.role === 'contractor' ? 'مزود' : 'مؤسسة'}</h6>
            <p className="card-text"><strong>البريد الإلكتروني:</strong> {formData.email}</p>
            <p className="card-text"><strong>رقم الهاتف:</strong> {formData.phoneNumber}</p>
            <p className="card-text"><strong>تاريخ التسجيل:</strong> {formatTimestamp(userData.registeredAt)} </p>
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>تعديل الملف الشخصي</button>
            <button className="btn btn-danger" onClick={handleLogout}>تسجيل الخروج</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
