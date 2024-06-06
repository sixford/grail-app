import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"
import { Col, Row, Card, Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../subcomponents/LoadingSpinner"
import FormModal from "../subcomponents/FormModal"

export default function HomeFeed() {
  const args = { headers: { authorization: `Bearer ${getToken()}` } }
  const [itemData, setItemData] = useState([])
  const [error, setError] = useState()
  const [titleShow, setTitleShow] = useState()
  const [nextItem, setNextItem] = useState()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})
  const [editingItemId, setEditingItemId] = useState(null)
  const navigate = useNavigate()
  const token = getToken()

  useEffect(() => {
    if (nextItem) navigate(`/items/${nextItem}`)
  }, [nextItem, navigate])

  useEffect(() => {
    async function getItemData() {
      try {
        const response = await axios.get("/api/items/", args)
        setItemData(response.data)
      } catch (error) {
        setError(error)
      }
    }
    getItemData()
  }, [])

  const fetchItemData = async () => {
    try {
      const response = await axios.get("/api/items/", args)
      setItemData(response.data)
    } catch (error) {
      setError(error)
    }
  }

  const handleAddItem = () => {
    setEditingItemId(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEditItem = (item) => {
    setEditingItemId(item.id)
    setFormData(item)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleModalSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItemId) {
        await axios.put(`/api/items/${editingItemId}/`, formData, args)
      } else {
        await axios.post('/api/items/', formData, args)
      }
      setShowModal(false)
      fetchItemData()
    } catch (error) {
      console.log(error)
    }
  }

  const isOwner = (item) => {
    return item.owner === token.user_id
  }

  return (
    <div className="homefeed flex-grow-1">
      <Container className="home-feed-container">
        {itemData.length ? (
          <>
            <h1 className="text-center text-dark my-4">Marketplace</h1>
            <Button variant="primary" onClick={handleAddItem}>
              Add Item
            </Button>
            <Row className="g-4 pb-4 d-flex">
              {itemData.map((item) => {
                const { owner, image_1, brand, type, id } = item
                return (
                  <Col key={id} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Card className="home-cards">
                      <Card.Img
                        src={image_1}
                        alt={brand}
                        className={
                          titleShow && titleShow === id
                            ? "home-feed-card-img-hover"
                            : "home-feed-card-img"
                        }
                      />
                      <Card.ImgOverlay
                        className="overlay d-flex flex-column justify-content-center"
                        id={id}
                        onMouseEnter={() => setTitleShow(id)}
                        onMouseLeave={() => setTitleShow(null)}
                        onClick={() => setNextItem(id)}
                      >
                        <div>
                          {titleShow && (
                            <Card.Title className="post-title">
                              {id === titleShow ? brand : ""}
                            </Card.Title>
                          )}
                        </div>
                      </Card.ImgOverlay>
                      <Card.Body className="py-2">
                        <Card.Title className="card-title">
                          {owner.username}
                        </Card.Title>
                        <Card.Text>{type.join(", ")}</Card.Text>
                        {isOwner(item) && (
                          <Button variant="secondary" onClick={() => handleEditItem(item)}>
                            Edit
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </>
        ) : (
          <div className="d-flex justify-content-center" style={{ color: "white" }}>
            {error ? <p className="error">{error.message}</p> : <LoadingSpinner />}
          </div>
        )}
      </Container>
      <FormModal
        show={showModal}
        handleClose={handleModalClose}
        handleSubmit={handleModalSubmit}
        title={editingItemId ? "Edit Item" : "Add New Item"}
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
      />
    </div>
  )
}


