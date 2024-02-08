import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./css/nav_style.css";
export function CollapsibleExample() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className=""
      id="custom-pink-navbar"
      data-bs-theme="light"
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/home">
          <img
            src="src/assets/logo.webp"
            width="auto"
            height="30"
            className="d-inline-block align-top"
            alt="Big @ Heart Logo"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="me-auto">
            <Nav.Link href="/login" className="nav-text">
              ignore
            </Nav.Link>
            <Nav.Link href="/dashboard" className="nav-text">
              about
            </Nav.Link>
            <Nav.Link href="/cards" className="nav-text">
              volunteer
            </Nav.Link>
            <Nav.Link href="/details" className="nav-text">
              details
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">goonette</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">gooney</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />+
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href="/signin" className="nav-text">
              log in
            </Nav.Link>
            <Nav.Link eventKey={2} href="/signup" className="nav-text sign-up">
              sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export function CustomColour() {
  return (
    <>
      <Navbar className="custom-pink-navbar" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CollapsibleExample;
