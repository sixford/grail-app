import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [error, setError] = useState('')

  const fetchCartItems = useCallback(async () => {
    try {
      const token = getToken()
      const response = await axios.get('/api/items/cart/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCartItems(response.data.items || [])
    } catch (err) {
      setError('There was an error fetching the cart items')
      console.error(err)
    }
  }, [])

  useEffect(() => {


    fetchCartItems()
  }, [])

  const handleRemoveItem = async (itemId) => {
    try {
      const token = getToken()
      await axios.delete(`/api/items/cart/remove/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchCartItems()
    } catch (err) {
      setError('There was an error removing the item from the cart')
      console.error(err)
    }
  }

  return (
    <Container className="mt-4">
      <h1>Your Cart</h1>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {cartItems.length > 0 ? (
          cartItems.map(cartItem => (
            <Col key={cartItem.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={cartItem.item.image_1} alt={cartItem.item.brand} />
                <Card.Body>
                  <Card.Title>{cartItem.item.brand}</Card.Title>
                  <Card.Text>
                    {cartItem.item.type.join(', ')} - {cartItem.item.colour}
                  </Card.Text>
                  <Card.Text>
                    Size: {cartItem.item.size}
                  </Card.Text>
                  <Card.Text>
                    Price: ${cartItem.item.price}
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveItem(cartItem.item.id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </Row>
    </Container>
  )
}

export default CartPage