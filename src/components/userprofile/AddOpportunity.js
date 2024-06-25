import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore, storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddOpportunity = ({ fetchOpportunities }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoURL = '';
      if (photo) {
        const photoRef = ref(storage, `opportunities/${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await addDoc(collection(firestore, 'opportunities'), {
        title,
        description,
        budget: parseFloat(budget),
        endDate: new Date(endDate),
        createdBy: auth.currentUser.uid,
        tags: tags.map(tag => tag.toLowerCase().trim()),
        photoURL,
        createdAt: serverTimestamp()
      });

      setTitle('');
      setDescription('');
      setBudget('');
      setEndDate('');
      setTags([]);
      setTagInput('');
      setPhoto(null);
      fetchOpportunities();
    } catch (error) {
      console.error('Error adding opportunity:', error);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== '' && !tags.includes(tagInput.toLowerCase().trim())) {
      setTags([...tags, tagInput.toLowerCase().trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>إضافة فرصة</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="العنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="الوصف"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="الميزانية"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="تاريخ الانتهاء"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="إضافة مواد"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleAddTag}>أضف</button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2">
                {tags.map(tag => (
                  <span key={tag} className="badge bg-primary me-2">
                    {tag}
                    <button type="button" className="btn-close" onClick={() => handleRemoveTag(tag)}></button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">صورة الفرصة</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary">إضافة فرصة</button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunity;
