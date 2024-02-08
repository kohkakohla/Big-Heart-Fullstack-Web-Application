import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './css/nav_style.css';


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
            <Nav.Link href="/history" className="nav-text">
              history
            </Nav.Link>
            <Nav.Link href="/profile" className="nav-text">
              Profile
            </Nav.Link>
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



export default CollapsibleExample;