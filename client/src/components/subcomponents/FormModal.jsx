// Bootstrap Components
import { Button, Form, Modal } from 'react-bootstrap'
// Custom Components
import ImageUpload from '../elements/ImageUpload.jsx'
import PropTypes from 'prop-types'

export default function FormModal({ show, handleClose, handleSubmit, title, formData, setFormData, error, setError, isCreate = true }) {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
        setError('')
    }

    function handleMultiple(e){
      const asArray = e.target.value.replace(' ', '').split(',')
    
      setFormData({...formData, types: asArray})
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Brand"
                            name='brand'
                            onChange={handleChange}
                            value={formData.brand}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type (comma separated)"
                            name='type'
                            onChange={handleChange}
                            value={formData.type}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Colour"
                            name='colour'
                            onChange={handleChange}
                            value={formData.colour}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="year_of_release">
                        <Form.Label>Year of Release</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Year of Release"
                            name='year_of_release'
                            onChange={handleChange}
                            value={formData.year_of_release}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Size"
                            name='size'
                            onChange={handleChange}
                            value={formData.size}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            name='price'
                            onChange={handleChange}
                            value={formData.price}
                            step="0.01"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name='description'
                            onChange={handleChange}
                            value={formData.description}
                            placeholder="Description"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image_1">
                        <Form.Label>Image 1</Form.Label>
                        <ImageUpload formData={formData} setFormData={setFormData} fieldName="image_1" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image_2">
                        <Form.Label>Image 2</Form.Label>
                        <ImageUpload formData={formData} setFormData={setFormData} fieldName="image_2" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image_3">
                        <Form.Label>Image 3</Form.Label>
                        <ImageUpload formData={formData} setFormData={setFormData} fieldName="image_3" />
                    </Form.Group>
                    {error && <p className='text-danger text-center my-2'>{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

FormModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    formData: PropTypes.shape({
        brand: PropTypes.string,
        type: PropTypes.array,
        colour: PropTypes.string,
        year_of_release: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        size: PropTypes.string,
        price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        description: PropTypes.string,
        image_1: PropTypes.string,
        image_2: PropTypes.string,
        image_3: PropTypes.string
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
    isCreate: PropTypes.bool
}