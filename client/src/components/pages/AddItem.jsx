import { useState, useEffect } from 'react';
import axios from 'axios';
import FormModal from '../subcomponents/FormModal.jsx';

const AddItem = ({ editingItemId }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editingItemId) {
      fetchItem(editingItemId);
    }
  }, [editingItemId]);

  const fetchItem = async (itemId) => {
    try {
      const response = await axios.get(`/api/items/${itemId}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItemId) {
        await axios.put(`/api/items/${editingItemId}/`, formData);
      } else {
        await axios.post('/api/items/', formData);
      }
      // Optionally, redirect the user to a different page after successful submission
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormModal
      show={true} // Set to true to always show the modal
      handleClose={() => {}} // Placeholder function for closing the modal
      handleSubmit={handleSubmit}
      title={editingItemId ? 'Edit Item' : 'Add New Item'}
      formData={formData}
      setFormData={setFormData}
      error={''} // Placeholder for error message
      setError={() => {}} // Placeholder function for setting error
      isCreate={!editingItemId} // Determine if it's a create or edit operation
      handleChange={handleChange} // Pass handleChange to the FormModal component
    />
  );
};

export default AddItem
