import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../../services/firebase';

const AddOpportunity = ({ fetchOpportunities }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, 'opportunities'), {
        title,
        description,
        budget: parseFloat(budget),
        endDate: new Date(endDate),
        createdBy: auth.currentUser.uid,
        tags: tags.map(tag => tag.toLowerCase().trim())
      });
      setTitle('');
      setDescription('');
      setBudget('');
      setEndDate('');
      setTags([]);
      setTagInput('');
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
        <h3>Add Opportunity</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
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
                placeholder="Add Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleAddTag}>Add</button>
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
          <button type="submit" className="btn btn-primary">Add Opportunity</button>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunity;