import ImageUpload from '../elements/ImageUpload.jsx'
import PropTypes from 'prop-types'

export default function FormModal({ show, handleClose, handleSubmit, title, formData, setFormData, error, setError }) {
    if (!show) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleMultiple = (e) => {
        const asArray = e.target.value.replace(/\s+/g, '').split(',')
        setFormData({ ...formData, type: asArray })
    }

    const inputClass =
        "w-full border border-ink/20 bg-cream px-4 py-2.5 text-sm focus:outline-none focus:border-electric transition-colors"
    const labelClass =
        "block font-sans text-xs tracking-widest2 uppercase text-ink/60 mb-2"

    return (
        // Backdrop: clicking it closes the modal
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
            onClick={handleClose}
        >
            {/* Modal content: stopPropagation so clicks inside don't bubble to the backdrop */}
            <div
                className="bg-cream w-full max-w-lg max-h-[90vh] overflow-y-auto border border-ink/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
                    <h2 className="font-serif text-2xl">{title}</h2>
                    <button
                        onClick={handleClose}
                        aria-label="Close"
                        className="font-sans text-xs uppercase tracking-widest2 text-ink/60 hover:text-ink transition-colors"
                    >
                        Close
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
                    <div>
                        <label htmlFor="brand" className={labelClass}>Brand</label>
                        <input
                            id="brand"
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            onChange={handleChange}
                            value={formData.brand || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className={labelClass}>Type</label>
                        <input
                            id="type"
                            type="text"
                            name="type"
                            placeholder="Type (comma separated)"
                            onChange={handleMultiple}
                            value={(formData.type && formData.type.join(', ')) || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="colour" className={labelClass}>Colour</label>
                        <input
                            id="colour"
                            type="text"
                            name="colour"
                            placeholder="Colour"
                            onChange={handleChange}
                            value={formData.colour || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="year_of_release" className={labelClass}>Year of Release</label>
                        <input
                            id="year_of_release"
                            type="number"
                            name="year_of_release"
                            placeholder="Year of Release"
                            onChange={handleChange}
                            value={formData.year_of_release || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="size" className={labelClass}>Size</label>
                        <input
                            id="size"
                            type="text"
                            name="size"
                            placeholder="Size"
                            onChange={handleChange}
                            value={formData.size || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className={labelClass}>Price</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            placeholder="Price"
                            step="0.01"
                            onChange={handleChange}
                            value={formData.price || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            placeholder="Description"
                            onChange={handleChange}
                            value={formData.description || ''}
                            required
                            className={inputClass}
                        />
                    </div>

                    <ImageUpload formData={formData} setFormData={setFormData} fieldName="image_1" label="Image 1" />
                    <ImageUpload formData={formData} setFormData={setFormData} fieldName="image_2" label="Image 2" />
                    <ImageUpload formData={formData} setFormData={setFormData} fieldName="image_3" label="Image 3" />

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 border border-ink/20 py-3 font-sans text-sm uppercase tracking-widest2 hover:bg-ink/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-electric text-cream py-3 font-sans text-sm uppercase tracking-widest2 hover:bg-ink transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired
}