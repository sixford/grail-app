import { useState, useEffect } from 'react'
import axios from 'axios'
import FormModal from '../subcomponents/FormModal.jsx'
import { getToken } from '../../lib/auth.js'

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
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingItemId) {
      fetchItem(editingItemId)
    }
  }, [editingItemId])

  const fetchItem = async (itemId) => {
    try {
      const response = await axios.get(`/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching item:', error)
      setError('Error fetching item.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItemId) {
        await axios.put(`/api/items/${editingItemId}/`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
      } else {
        await axios.post('/api/items/', formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
      }
      handleClose()
    } catch (error) {
      console.error('Error submitting item:', error)
      setError('Error submitting item.')
    }
  }

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
      isCreate={!editingItemId}
    />
  )
}

export default AddItem
