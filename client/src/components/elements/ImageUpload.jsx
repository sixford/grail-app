import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function ImageUpload({ formData, setFormData, fieldName, label = 'Image' }) {
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
            setFormData({ ...formData, [fieldName]: data.secure_url })
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <label htmlFor={fieldName} className="block font-sans text-xs tracking-widest2 uppercase text-ink/60 mb-2">
                {label}
            </label>
            <input
                type="file"
                id={fieldName}
                name={fieldName}
                accept="image/*"
                onChange={handleUpload}
                className="block w-full text-sm text-ink/70 border border-ink/20 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-electric file:text-cream file:text-xs file:uppercase file:tracking-widest2 file:cursor-pointer hover:file:bg-ink file:transition-colors"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {formData[fieldName] && (
                <img
                    src={formData[fieldName]}
                    alt="Uploaded preview"
                    className="w-full mt-3 border border-ink/10"
                />
            )}
        </div>
    )
}

ImageUpload.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string
}