import React, { useState } from 'react';
import { auth, firestore } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Chip, Paper } from '@material-ui/core';

const AddOpportunity = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    createdBy:auth.currentUser.uid,
    endDate: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
      }
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => () => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, 'opportunities'), {
        ...formData,
        endDate: new Date(formData.endDate),
      });
      console.log('Document written with ID: ', docRef.id);
      setFormData({
        title: '',
        description: '',
        budget: '',
        endDate: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="card my-4">
      <div className="card-header">
        <h3>Add Opportunity</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="budget" className="form-label">Budget</label>
            <input
              type="number"
              name="budget"
              className="form-control"
              value={formData.budget}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Materials"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyPress={handleTagInputKeyPress}
              fullWidth
            />
            <Paper variant="outlined" className="mt-2 p-2">
              {formData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={handleTagDelete(tag)}
                  className="m-1"
                />
              ))}
            </Paper>
          </div>
          <button type="submit" className="btn btn-primary">Add Opportunity</button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunity;
