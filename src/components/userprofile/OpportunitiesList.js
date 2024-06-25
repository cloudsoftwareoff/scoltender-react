import React, { useState } from 'react';
import { doc as firestoreDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../services/firebase';
import { Chip, TextField, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


const OpportunitiesList = ({ opportunities }) => {

  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    budget: '',
    endDate: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const handleEditClick = (opportunity) => {
    setEditingOpportunity(opportunity.id);
    setEditForm({
      title: opportunity.title,
      description: opportunity.description,
      budget: opportunity.budget,
      endDate: new Date(opportunity.endDate.seconds * 1000).toISOString().split('T')[0],
      tags: opportunity.tags || []
    });
  };

  const handleDeleteClick = async (opportunityId) => {
    try {
      await deleteDoc(firestoreDoc(firestore, 'opportunities', opportunityId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const opportunityRef = firestoreDoc(firestore, 'opportunities', editingOpportunity);
      await updateDoc(opportunityRef, {
        title: editForm.title,
        description: editForm.description,
        budget: parseFloat(editForm.budget),
        endDate: new Date(editForm.endDate),
        tags: editForm.tags
      });
      setEditingOpportunity(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setEditForm({
        ...editForm,
        tags: [...editForm.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setEditForm({
      ...editForm,
      tags: editForm.tags.filter(tag => tag !== tagToDelete)
    });
  };

  return (
    <div className="card" style={{ textAlign: 'right' }}>
      <div className="card-header">
        <h3>الفرص</h3>
      </div>
      <ul className="list-group list-group-flush">
        {opportunities.map(opportunity => {
          const hasEnded = new Date() > new Date(opportunity.endDate.seconds * 1000);
          return (
            <li key={opportunity.id} className="list-group-item">
              {editingOpportunity === opportunity.id ? (
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label className="form-label">عنوان</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">وصف</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">الميزانية</label>
                    <input
                      type="number"
                      className="form-control"
                      name="budget"
                      value={editForm.budget}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">تاريخ الانتهاء</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={editForm.endDate}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">العلامات</label>
                    <div className="d-flex flex-wrap">
                      {editForm.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => handleDeleteTag(tag)}
                          className="me-2 mb-2"
                        />
                      ))}
                    </div>
                    <div className="d-flex">
                      <TextField
                        label="إضافة علامة"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="me-2"
                      />
                      <IconButton color="primary" onClick={handleAddTag}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">تحديث</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingOpportunity(null)}>إلغاء</button>
                </form>
              ) : (
                <>
                  <h5>{opportunity.title}</h5>
                  <p>{opportunity.description}</p>
                  <div className="d-flex flex-wrap">
                    {opportunity.tags &&
                      opportunity.tags.map((tag, index) => (
                        <Chip key={index} label={tag.trim()} className="me-2 mb-2" />
                      ))}
                  </div>
                  <p><strong>الميزانية:</strong> {opportunity.budget}د</p>
                  <p><strong>تاريخ الانتهاء:</strong> {formatTimestamp(opportunity.endDate)}</p>
                  {!hasEnded && (
                    <>
                      <button className="btn btn-warning me-2" onClick={() => handleEditClick(opportunity)}>تعديل</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteClick(opportunity.id)}>حذف</button>
                    </>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OpportunitiesList;
