import React from "react";
import './navbar.scss'
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function NavigationBar (props) {
  return (
    <>
      <Navbar bg="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./images/logo.png"
              width="300"
              height="80"
              className="d-inline-block align-center"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Covid Testing/Vaccination</Nav.Link>
              <Nav.Link href="#pricing">Covid Statistics</Nav.Link>
            </Nav>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link href="/home">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/home">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
