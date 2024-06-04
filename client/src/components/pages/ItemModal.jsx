// import { useState } from 'react'
import PropTypes from 'prop-types'

const ItemModal = ({ item, onClose, onEdit, onDelete }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{item.brand} - {item.colour}</h2>
        <p>Year of Release: {item.year_of_release}</p>
        <p>Size: {item.size}</p>
        <p>Price: ${item.price}</p>
        <p>Description: {item.description}</p>
        <div className="images">
          {item.image_1 && <img src={item.image_1} alt="sneaker 1" />}
          {item.image_2 && <img src={item.image_2} alt="sneaker 2" />}
          {item.image_3 && <img src={item.image_3} alt="sneaker 3" />}
        </div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}

ItemModal.propTypes = {
  item: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    colour: PropTypes.string.isRequired,
    year_of_release: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    image_1: PropTypes.string,
    image_2: PropTypes.string,
    image_3: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ItemModal