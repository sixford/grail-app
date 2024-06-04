import { useState, useEffect } from 'react'
import axios from 'axios'

const AddItem = ({ editingItemId }) => {
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

  useEffect(() => {
    if (editingItemId) {
      fetchItem(editingItemId)
    }
  }, [editingItemId])

  const fetchItem = async (itemId) => {
    try {
      const response = await axios.get(`/api/items/${itemId}`)
      setFormData(response.data);
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
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items/${editingItemId}/`)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>{editingItemId ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        <input type="text" name="type" value={formData.type} onChange={handleChange} />
        <input type="text" name="colour" value={formData.colour} onChange={handleChange} />
        <input type="number" name="year_of_release" value={formData.year_of_release} onChange={handleChange} />
        <input type="text" name="size" value={formData.size} onChange={handleChange} />
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <input type="text" name="image_1" value={formData.image_1} onChange={handleChange} />
        <input type="text" name="image_2" value={formData.image_2} onChange={handleChange} />
        <input type="text" name="image_3" value={formData.image_3} onChange={handleChange} />
        <button type="submit">{editingItemId ? 'Update' : 'Add'} Item</button>
      </form>
      {editingItemId && (
        <button onClick={handleDelete}>Delete Item</button>
      )}
    </div>
  )
}

export default AddItem

