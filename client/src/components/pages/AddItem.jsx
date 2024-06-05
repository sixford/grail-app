import { useState, useEffect } from 'react';
import axios from 'axios';
import FormModal from '../subcomponents/FormModal.jsx';
import { getToken } from '../../lib/auth.js';

const AddItem = ({ editingItemId, show, handleClose }) => {
  const [formData, setFormData] = useState({
    brand: '',
    type: '',
    colour: '',
    year_of_release: '',
    size: '',
    price: '',
    description: '',
    image_1: '',
    image_2: '',
    image_3: ''
  });
  const [error, setError] = useState('');

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
      const config = { headers: { Authorization: `Bearer ${getToken()}` } };
      if (editingItemId) {
        await axios.put(`/api/items/${editingItemId}/`, formData, config);
      } else {
        await axios.post('/api/items/', formData, config);
      }
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      setError('Error submitting item');
      console.error('Error submitting item:', error);
    }
  };

  return (
    <FormModal
      show={show}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={editingItemId ? 'Edit Item' : 'Add New Item'}
      formData={formData}
      setFormData={setFormData}
      error={error}
      setError={setError}
    />
  );
};

export default AddItem;
