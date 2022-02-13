import React from "react";
import './navbar.scss'
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from '@mui/material/Button';

export default function NavigationBar (props) {
  return (
    <>
      <Navbar bg="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="./images/logo.png"
              
              className="d-inline-block align-center"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav variant="pills">
              <Nav.Item>
                <Button variant="contained">Login</Button>
              </Nav.Item>
              <Nav.Item>
                <Button variant="contained">Register</Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
