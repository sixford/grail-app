import axios from 'axios'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function ImageUpload({ formData, setFormData, fieldName }) {
    const [error, setError] = useState('')

    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL

    async function handleUpload(e) {
        const file = e.target.files[0]
        const form = new FormData()
        form.append('file', file)
        form.append('upload_preset', uploadPreset)
        
        try {
            const { data } = await axios.post(uploadUrl, form)
            console.log(data.secure_url)
            setFormData({ ...formData, [fieldName]: data.secure_url })
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    return (
        <>
            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    name={fieldName}
                    accept="image/*"
                    onChange={handleUpload}
                    required
                />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            {formData[fieldName] && <img src={formData[fieldName]} alt="Uploaded preview" style={{ width: '100%', marginTop: '10px' }} />}
        </>
    )
}

ImageUpload.propTypes = {
  formData: PropTypes.shape({
      image: PropTypes.string
  }).isRequired,
  setFormData: PropTypes.func.isRequired
}
