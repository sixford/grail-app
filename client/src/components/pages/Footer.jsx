import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Footer() {
  return (
    <footer className='footer' style={{ background: '#E6E6E6' }}>
      <Container>
        <Row className='footer-row'>
          <Col className='footer-col'>
            <Link target='_blank' to='https://github.com/sixford' className='footer-link teal-text'>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
