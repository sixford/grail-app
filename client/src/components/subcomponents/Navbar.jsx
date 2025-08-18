import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { removeToken } from "../../lib/auth"; // Update this path if needed

export default function NavBar({ isAuthenticated, setIsAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    setIsAuthenticated(false);
    navigate("/auth");
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search/${trimmedQuery}`);
      setSearchQuery("");
    } else {
      navigate("/search/invalid");
    }
  }

  return (
    <>
      <Navbar expand="md" bg="light" className="mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Grail
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvas-navbar" />
          <Navbar.Offcanvas
            id="offcanvas-navbar"
            aria-labelledby="offcanvas-navbar-label"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvas-navbar-label">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {isAuthenticated && (
                  <>
                    <Nav.Link as={Link} to="/homefeed">
                      Feed
                    </Nav.Link>
                    <Nav.Link as={Link} to="/add-item">
                      Sell
                    </Nav.Link>
                    <Nav.Link as={Link} to="/cart">
                      Cart
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                )}
                {!isAuthenticated && (
                  <Nav.Link as={Link} to="/auth">
                    Login / Register
                  </Nav.Link>
                )}
              </Nav>
              <Form className="d-flex mt-3 mt-md-0" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-primary" type="submit">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
