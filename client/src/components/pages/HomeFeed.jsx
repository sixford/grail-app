import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth" 
import { Col, Row, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../subcomponents/LoadingSpinner"



export default function HomeFeed() {
    // Auth headers
    const args = { headers: { authorization: `Bearer ${getToken()}` } }

    const [itemData, setItemData] = useState([])
    const [error, setError] = useState()
    const [titleShow, setTitleShow] = useState()
    const navigate = useNavigate()
    const [nextItem, setNextItem] = useState()

    useEffect(() => {
        if (nextItem) navigate(`/items/${nextItem}`)
    }, [nextItem])

    useEffect(() => {
        async function getItemData() {
            try {
                const response = await axios.get("/api/items/", args)
                setItemData(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        getItemData()
    }, [])

    function hoverItem(e) {
        setTitleShow(e.target.id)
    }

    function unhoverItem() {
        setTitleShow(false)
    }
    

    return (
        <div className="homefeed flex-grow-1">
            <Container className="home-feed-container">
                {itemData.length ? (
                    <>
                        <h1 className="text-center text-light my-4">Home Feed</h1>
                        <Row className="g-4 pb-4 d-flex">
                            {itemData.map(item => {
                                // Destructure vital data
                                const { owner, image_1, brand, type, id } = item;
                                return (
                                    // Generate card for each item
                                    <Col key={id} xs={12} sm={6} md={4} lg={4} xl={4}>
                                        <Card className="home-cards">
                                            <Card.Img
                                                src={image_1}
                                                alt={brand}
                                                className={titleShow && titleShow === id ? 'home-feed-card-img-hover' : 'home-feed-card-img'}
                                            />
                                            <Card.ImgOverlay
                                                className="overlay d-flex flex-column justify-content-center"
                                                id={id}
                                                onMouseEnter={hoverItem}
                                                onMouseLeave={unhoverItem}
                                                onClick={() => setNextItem(id)}
                                            >
                                                <div>
                                                    {titleShow && <Card.Title className="post-title">{id === titleShow ? brand : ''}</Card.Title>}
                                                </div>
                                            </Card.ImgOverlay>
                                            <Card.Body className="py-2">
                                                <Card.Title className="card-title">{owner.username}</Card.Title>
                                                <Card.Text>{type.join(', ')}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </>
                ) : (
                    <div className="d-flex justify-content-center" style={{ color: 'white' }}>
                        {error ? <p className="error">{error.message}</p> : <LoadingSpinner />}
                    </div>
                )}
            </Container>
        </div>
    )
}