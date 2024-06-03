import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap'
import { getToken } from '../../lib/auth'; // Ensure this function retrieves the stored JWT token

const SingleItem = () => {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${itemId}/`)
        setItem(response.data)
      } catch (err) {
        setError('There was an error fetching the item details!')
        console.error(err)
      }
    }

    fetchItem()
  }, [itemId])

  const handleAddToCart = async () => {
    try {
      const token = getToken()
      await axios.post(`/api/items/cart/add/${itemId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/cart')
    } catch (err) {
      setError('There was an error adding the item to the cart!')
      console.error(err)
    }
  };

  return (
    <Container className="mt-4">
      {error && <p className="text-danger">{error}</p>}
      {item ? (
        <Row>
          <Col md={6}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={item.image_1}
                  alt={`${item.brand} ${item.type}`}
                />
              </Carousel.Item>
              {item.image_2 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.image_2}
                    alt={`${item.brand} ${item.type}`}
                  />
                </Carousel.Item>
              )}
              {item.image_3 && (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={item.image_3}
                    alt={`${item.brand} ${item.type}`}
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{item.brand} {item.type}</Card.Title>
                <Card.Text>
                  <strong>Color:</strong> {item.colour}
                </Card.Text>
                <Card.Text>
                  <strong>Size:</strong> {item.size}
                </Card.Text>
                <Card.Text>
                  <strong>Year of Release:</strong> {item.year_of_release}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${item.price}
                </Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading item details...</p>
      )}
    </Container>
  )
}

export default SingleItem