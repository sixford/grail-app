import { useState, useEffect } from 'react'
import axios from 'axios'
import FormModal from '../subcomponents/FormModal.jsx'

const AddItem = ({ editingItemId }) => {
  const [formData, setFormData] = useState({
    brand: '',
    type: [],
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
      const response = await axios.get(`/api/items/${itemId}`)
      setFormData(response.data)
    } catch (error) {
      console.error('Error fetching item:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItemId) {
        await axios.put(`/api/items/${editingItemId}/`, formData)
      } else {
        await axios.post('/api/items/', formData)
      }
    } catch (error) {
      console.error('Error submitting item:', error)
      setError('There was an error submitting the form')
    }
  }

  return (
    <FormModal
      show={true}
      handleClose={() => {}}
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

